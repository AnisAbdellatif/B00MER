import { config } from "dotenv";
import { readdirSync } from "fs";
import Keyv from "keyv";

import { Client, Collection } from "discord.js";

config();

import Logger from "./Logger.js";
import * as Errors from "./customErrors.js";

const client = new Client();

client.keyv = new Keyv(process.env.DATABASE_URL);
client.keyv.on("error", (err) => {
    Logger.error(`Connection Error: ${err}`);
    process.exit(1);
});

client.guildConfig = {
    prefix: "$",
};

client.commands = new Collection();

const commandFiles = readdirSync("src/commands/").filter((file) =>
    file.endsWith(".js")
);
for (const file of commandFiles) {
    const command = (await import(`./commands/${file}`)).default;
    client.commands.set(command.name, command);
}

client.on("ready", async () => {
    client.botConfig = await client.keyv.get("botConfig");
    Logger.debug(`botConfig: ${JSON.stringify(client.botConfig)}`);
    if (!client.botConfig) {
        client.botConfig = {
            developerID: "343013591232020490",
            disabledCmds: [],
        };
    }

    await client.keyv.set("guildConfig", client.guildConfig);
    client.guildsDB = new Map();

    // List servers the bot is connected to
    Logger.info("Servers:");
    client.guilds.cache.each(async (guild) => {
        Logger.info(`   -- ${guild.name} - ${guild.id}`);
        client.guildsDB.set(guild.id, await client.keyv.get(guild.id));
    });

    client.user.setActivity(`Type ${client.guildConfig.prefix}help`);
    client.dev = client.botConfig.developerID;
    Logger.info(`${client.user.username} is online!`);
});

client.on("message", async (message) => {
    let prefix;
    if (message.channel.type != "text") {
        prefix = client.guildConfig.prefix;
    } else {
        let guildDB = await client.guildsDB.get(message.guild.id);
        prefix = guildDB.prefix;
    }

    if (message.author.bot || !message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    try {
        let command = client.commands.get(commandName);

        if (!command) {
            command = client.commands.find(
                (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
            );
            if (!command) throw new Errors.CommandNotFound();
            command.calledBy = commandName;
        }
        await command.execute(message, args);
    } catch (error) {
        if (error instanceof Errors.CustomError) {
            message.reply(error.message);
        } else {
            message.reply(
                "An error occured while trying to execute that command!"
            );
        }
        Logger.error(error);
    }
});

client.on("guildCreate", async (guild) => {
    Logger.info(
        `${guild.joinedAt.toLocaleString()}> Joined guild: ${guild.name}<${
            guild.id
        }>`
    );
    await client.keyv.set(guild.id, client.guildConfig);
    await client.guildsDB.set(guild.id, client.guildConfig);
});

client.on("guildDelete", async (guild) => {
    Logger.info(
        `${guild.joinedAt.toLocaleString()}> Left guild: ${guild.name}<${
            guild.id
        }>`
    );
    await client.keyv.delete(guild.id);
    await client.guildsDB.delete(guild.id);
});

client.login(process.env.DISCORD_BOT_TOKEN);

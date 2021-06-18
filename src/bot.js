import { config } from "dotenv";
import { readdirSync } from "fs";
import Keyv from "keyv";

import { Client, Collection } from "discord.js";
const client = new Client();

config();

import Logger from "./Logger.js";
import * as Errors from "./customErrors.js";

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

    // List servers the bot is connected to
    Logger.info("Servers:");
    client.guilds.cache.each((guild) => {
        Logger.info(`   -- ${guild.name} - ${guild.id}`);
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
        while (true) {
            try {
                let guildDB = await client.keyv.get(message.guild.id);
                if (!guildDB) {
                    await client.keyv.set(message.guild.id, client.guildConfig);
                    prefix = client.guildConfig.prefix;
                } else {
                    prefix = guildDB.prefix;
                }
                break;
            } catch (error) {
                Logger.error(error);
                Logger.warn("Reconnecting to db!");
                client.keyv = new Keyv(process.env.DATABASE_URL);
            }
        }
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
            if (!command)
                return message.reply(
                    `This command sadly does not exist! \:face_with_monocle:`
                );
            command.calledBy = commandName;
        }
        try {
            await command.execute(message, args);
        } catch (error) {
            if (error instanceof Errors.CustomError) {
                message.reply(error.message);
            }
            Logger.error(error);
        }
    } catch (error) {
        Logger.error(error);
        message.reply("An error occured while trying to execute that command!");
    }
});

client.on("guildCreate", async (guild) => {
    Logger.info(
        `${guild.joinedAt.toLocaleString()}> Joined guild: ${guild.name}<${
            guild.id
        }>`
    );
    await client.keyv.set(guild.id, client.guildConfig);
});

client.on("guildDelete", async (guild) => {
    Logger.info(
        `${guild.joinedAt.toLocaleString()}> Left guild: ${guild.name}<${
            guild.id
        }>`
    );
    await client.keyv.delete(guild.id);
});

client.login(process.env.DISCORD_BOT_TOKEN);

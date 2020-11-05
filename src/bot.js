require("dotenv").config();
const fs = require("fs");
const Keyv = require("keyv");

const { Client, Collection } = require("discord.js");
const client = new Client();

client.keyv = new Keyv(process.env.DATABASE_URL);
client.keyv.on("error", (err) => {
    console.log("Connection Error", err);
    process.exit(1);
});

client.guildConfig = {
    prefix: "$",
};

client.commands = new Collection();

const commandFiles = fs
    .readdirSync("src/commands/")
    .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on("ready", async () => {
    client.botConfig = await client.keyv.get("botConfig", client.botConfig);
    console.log(client.botConfig);
    if (!client.botConfig) {
        client.botConfig = {
            developerID: "343013591232020490",
            disabledCmds: [],
        };
    }

    await client.keyv.set("guildConfig", client.guildConfig);

    // List servers the bot is connected to
    console.log("Servers:");
    client.guilds.cache.each((guild) => {
        console.log(` -- ${guild.name} - ${guild.id}`);
    });

    client.user.setActivity(`Type ${client.guildConfig.prefix}help`);
    client.dev = client.botConfig.developerID;
    console.log(`${client.user.username} is online!`);
});

client.on("message", async (message) => {
    let prefix;
    if (message.channel.type != "text") {
        prefix = client.guildConfig.prefix;
    } else {
        while (true) {
            try {
                guildDB = await client.keyv.get(message.guild.id);
                if (!guildDB) {
                    await client.keyv.set(message.guild.id, client.guildConfig);
                    prefix = client.guildConfig.prefix;
                } else {
                    prefix = guildDB.prefix;
                }
                break;
            } catch (error) {
                console.log("Reconnecting to db!");
                client.keyv = new Keyv(process.env.DATABASE_URL);
                client.keyv.on("error", (err) => {
                    console.log("Connection Error", err);
                    process.exit(1);
                });
            }
        }
    }

    if (message.author.bot || !message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    try {
        let command = client.commands.get(commandName);

        if (!command) {
            command = client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
            if (!command) return message.reply(
                `This command sadly does not exist! \:face_with_monocle:`
            );
            command.calledBy = commandName;
        }

        if (client.botConfig.disabledCmds.includes(command.name)) {
            return message.reply(
                `Sorry, this command is currently disabled by the developer \:pleading_face:\nFor more information contact <@${client.dev}>`
            );
        } else if (message.channel.type == "dm" && !command.dm) {
            return message.reply(
                "I can only execute this command inside a server! \:wink:"
            );
        } else if (command.dev && message.author.id != client.dev) {
            return message.reply(
                `You are not allow to do that -_- Ask <@${client.dev}> to do it.`
            );
        } else if (command.permissions && !message.member.hasPermission(command.permissions)) {
            return message.reply(`You don't have permission to execute that command!`)
        } else if (command.botpermissions && !message.guild.member(message.client.user).hasPermission(command.permissions)) {
            return message.reply(`Give me the permission to execute that command!`)
        }

        await command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply("An error occured while trying to execute that command!");
    }
});

client.login(process.env.DISCORD_BOT_TOKEN);

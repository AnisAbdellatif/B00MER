import { readdirSync } from "fs";
import Command from "../Command.js";

const subCommands = new Map();

const commandFiles = readdirSync("src/commands/music").filter(
    (file) => file.endsWith(".js") && !file.startsWith("_")
);
for (const file of commandFiles) {
    const command = (await import(`./music/${file}`)).default;
    subCommands.set(command.name.toLowerCase(), command);
}

let cmdDesc = "";
[...subCommands.keys()].forEach((cmd) => {
    cmdDesc += " | " + cmd;
});

class Music extends Command {
    constructor() {
        super({
            name: "music",
            description: cmdDesc,
            aliases: [...subCommands.keys()],
        });
    }

    async execute(message, args) {
        super.execute(message, args);

        if (!message.client.queue) {
            message.client.queue = new Map();
        }

        message.client.serverQueue = await message.client.queue.get(
            message.guild.id
        );

        let guildDB = await message.client.keyv.get(message.guild.id);
        if (guildDB.musicRole && this.args[0] != "getrole") {
            const reqRole = message.guild.roles.cache.get(guildDB.musicRole);
            if (reqRole.comparePositionTo(message.member.roles.highest) > 0) {
                return message.reply(
                    "9alou baba wa9teh nwaliw chorfa, 9alou wa9teli ymoutou asyed el serveur :stuck_out_tongue_closed_eyes: (bara jib role wija)"
                );
            }
        }

        if (this.calledBy) {
            this.args.unshift(this.calledBy);
            this.calledBy = undefined;
        }

        const commandName = this.args.shift().toLowerCase();
        message.args = this.args;

        const command = subCommands.get(commandName);
        if (!command) {
            return message.reply(
                `This command sadly does not exist! \:face_with_monocle:`
            );
        }

        if (
            command.permissions &&
            !message.member.hasPermission(command.permissions)
        ) {
            return message.reply(
                `You don't have permission to execute that command!`
            );
        }

        await command.execute(message, args);
    }
}

export default new Music();

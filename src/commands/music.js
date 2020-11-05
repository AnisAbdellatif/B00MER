const fs = require("fs");

const subCommands = new Map();

const commandFiles = fs
    .readdirSync("src/commands/music")
    .filter((file) => file.endsWith('.js') && !file.startsWith('_'));
for (const file of commandFiles) {
    const command = require(`./music/${file}`);
    subCommands.set(command.name.toLowerCase(), command);
}

module.exports = {
    name: 'music',
    description: 'Play|Skip|Stop music',
    usage: '',
    aliases: [...subCommands.keys()],
    async execute(message, args) {
        if (!message.client.queue) {
            message.client.queue = new Map();
        }

        let serverQueue = await message.client.queue.get(message.guild.id);

        let guildDB = await message.client.keyv.get(message.guild.id);
        if (guildDB.musicRole && args[0] != "getrole") {
            const reqRole = message.guild.roles.cache.get(guildDB.musicRole);
            if (reqRole.comparePositionTo(message.member.roles.highest) > 0) {
                return message.reply(
                    "9alou baba wa9teh nwaliw chorfa, 9alou wa9teli ymoutou asyed el serveur \:stuck_out_tongue_closed_eyes: (bara jib role wija)"
                );
            }
        }

        if (this.calledBy) {
            args.unshift(this.calledBy);
            this.calledBy = undefined;
        }
        if (args.length == 0) {
            message.reply('Command is missing parameters!')
        }

        const commandName = args.shift().toLowerCase();
        message.args = args;

        const command = subCommands.get(commandName);
        if (!command) {
            return message.reply(
                `This command sadly does not exist! \:face_with_monocle:`
            );
        }

        if (command.permissions && !message.member.hasPermission(command.permissions)) {
            return message.reply(`You don't have permission to execute that command!`)
        }

        await command.execute(message, serverQueue);
    },
};

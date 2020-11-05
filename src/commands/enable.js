const { indexOf } = require("ffmpeg-static");

module.exports = {
    name: 'enable',
    description: 'Enable a Command',
    usage: '[command name]',
    dm: true,
    dev: true,
    async execute(message, args) {
        const command = message.client.commands.get(args[0]);
        const botConfig = message.client.botConfig;

        if (!command) {
            return message.reply('that\'s not a valid command!');
        } else if (!botConfig.disabledCmds.includes(command.name)) {
            return message.reply(`Command: ${command.name} enabled!`);
        }

        botConfig.disabledCmds.splice(botConfig.disabledCmds.indexOf(command.name), 1);
        message.client.botConfig = botConfig;
        await message.client.keyv.set('botConfig', botConfig);

        return message.reply(`Command: ${command.name} enabled!`);
    }
}

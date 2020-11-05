module.exports = {
    name: 'disable',
    description: 'Disable a Command',
    usage: '[command name]',
    dm: true,
    dev: true,
    async execute(message, args) {
        const command = message.client.commands.get(args[0]);
        const botConfig = message.client.botConfig;

        if (!command) {
            return message.reply('that\'s not a valid command!');
        } else if (botConfig.disabledCmds.includes(command.name)) {
            return message.reply(`Command: ${command.name} disabled!`);
        }

        botConfig.disabledCmds.push(command.name);
        message.client.botConfig = botConfig;
        await message.client.keyv.set('botConfig', botConfig);

        return message.reply(`Command: ${command.name} disabled!`);
    }
}

module.exports = {
    name: 'help',
    description: 'List all of my commands or info about a specific command.',
    usage: '[command name]',
    dm: true,
    async execute(message, args) {
        const data = [];
        const { commands } = message.client;
        const prefix = await message.client.keyv.get(message.guild.id).prefix;

        if (!args.length) {
            data.push('Here\'s a list of all my commands:\n');
            data.push(commands.map(command => { return `**${command.name}**: ${command.description}` }).join('\n\n'));
            data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

            return message.author.send(data)
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply('I\'ve sent you a DM with all my commands!');
                })
                .catch(error => {
                    console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                    message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
                });
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name);

        if (!command) {
            return message.reply('that\'s not a valid command!');
        }

        data.push(`<Name>: ${command.name}`);

        if (command.aliases) data.push(`<Aliases>: ${command.aliases.join(', ')}`);
        if (command.description) data.push(`<Description>: ${command.description}`);
        if (command.usage) data.push(`<Usage>: ${prefix}${command.name} ${command.usage}`);

        // data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

        message.author.send(data, { split: true });

    },
};

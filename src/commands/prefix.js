module.exports = {
    name: 'prefix',
    description: 'Changes the prefix used in commands',
    usage: '<new prefix>',
    dm: true,
    dev: true,
    async execute(message, args) {
        client = message.client;
        if (!message.guild.id) return message.channel.send(`The bot prefix is: ${client.guildConfig.prefix}`);

        guild = await client.keyv.get(message.guild.id)
        if (!args.length) {
            return message.channel.send(`The current prefix is: ${guild.prefix}`);
        } else {
            guild.prefix = args.join(" ");
            await client.keyv.set(message.guild.id, guild);

            return message.channel.send(`The prefix was changed to: '${args.join(" ")}'`);
        }
    },
};

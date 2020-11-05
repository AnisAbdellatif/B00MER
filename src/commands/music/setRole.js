module.exports = {
    name: 'setRole',
    permissions: ["MANAGE_GUILD", "MANAGE_ROLES"],
    async execute(message, serverQueue) {
        if (!message.mentions.roles)
            return message.channel.send("You did not mention a proper role!");
        
        let guild = await message.client.keyv.get(message.guild.id);
        let role;

        if (message.mentions.everyone) {
            delete guild.musicRole;
        } else {
            role = message.mentions.roles.first();
            guild.musicRole = role.id;
        }
        
        await message.client.keyv.set(message.guild.id, guild);
        return message.reply(`music role is set as: ${role ? "<@&"+role.id+">" : "@everyone"} !`);
    },
};

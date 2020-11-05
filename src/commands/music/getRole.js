module.exports = {
    name: 'getRole',
    async execute(message, serverQueue) {
        guildDB = await message.client.keyv.get(message.guild.id);
        let role;
        if (guildDB.musicRole)
            role = message.guild.roles.cache.get(guildDB.musicRole);

        message.reply(
            `Role allowed to execute music command: ${role ? "<@&" + role.id + ">" : "@everyone"
            }`
        );
    },
};

module.exports = {
    name: 'mute',
    description: 'Mute everyone in your voice channel',
    permissions: ["MUTE_MEMBERS"],
    botpermissions: ["MUTE_MEMBERS"],
    async execute(message, args) {
        client = message.client;
        const channel = message.member.voice.channel
        for (let member of channel.members) {
            if (member[1].user.bot) continue;
            member[1].voice.setMute(true);
        }
    },
};

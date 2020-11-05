const end = require('./_end');

module.exports = {
    name: 'stop',
    async execute(message, serverQueue) {
        if (!message.member.voice.channel)
            return message.channel.send(
                "You have to be in a voice channel to stop the music!"
            );
        await end(serverQueue)
    },
};

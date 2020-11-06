const validateNum = require('./_validateNumber');

module.exports = {
    name: 'volume',
    async execute(message, serverQueue) {
        const args = message.args;
        if (!serverQueue)
            return message.channel.send("You are not listening to music.");
        else if (!args[0])
            return message.channel.send(
                `Current music volume is set to: ${serverQueue.connection.dispatcher.volume * 100
                }`
            );

        const volume = validateNum(args[0], 0, 100)
        if (!volume)
            return message.reply(
                "Do you think i'm stupid or what? pick a damn number between 0-100 :face_with_monocle: "
            );

        serverQueue.connection.dispatcher.setVolume(volume / 100);
        serverQueue.volume = volume;
        message.channel.send(`Music volume set to ${volume}`);
    },
};

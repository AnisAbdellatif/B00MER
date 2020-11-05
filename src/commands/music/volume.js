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
        else if (isNaN(args[0]))
            return message.reply(
                "Do you think i'm stupid or what? pick a damn number between 0-100 :face_with_monocle: "
            );
        else if (!serverQueue)
            return message.reply(
                "Why are u shutting me up, i'm fucking quiet ffs! :face_with_symbols_over_mouth: (no songs)"
            );

        if (args[0] > 100) {
            args[0] = 100;
        } else if (args[0] < 0) {
            args[0] = 0;
        }

        serverQueue.connection.dispatcher.setVolume(parseInt(args[0]) / 100);
        serverQueue.volume = parseInt(args[0]);
        message.channel.send(`Music volume set to ${parseInt(args[0])}`);
    },
};

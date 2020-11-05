module.exports = {
    name: 'pause',
    async execute(message, serverQueue) {
        if (!serverQueue)
            return message.reply(
                "Oida mate, i have no shit to say :zany_face: (no songs)"
            );
        return serverQueue.connection.dispatcher.pause();
    },
};

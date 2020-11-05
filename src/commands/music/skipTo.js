module.exports = {
    name: 'skipTo',
    async execute(message, serverQueue) {
        const args = message.args;
        if (!message.member.voice.channel)
            return message.channel.send(
                "You have to be in a voice channel to skip to a song!"
            );

        if (!serverQueue)
            return message.channel.send("There is no song that I could skip!");
        else if (
            parseInt(args[0]) < 1 ||
            parseInt(args[0]) > serverQueue.songs.length - 1
        ) {
            return message.channel.send("The number you chose doesn't exist in queue!");
        }

        serverQueue.songs.splice(0, parseInt(args[0]) - 1);
        serverQueue.connection.dispatcher.end();
    },
};

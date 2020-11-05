const arrayMove = require("array-move");

module.exports = {
    name: 'moveToTop',
    async execute(message, serverQueue) {
        const args = message.args;
        if (isNaN(args[0])) return message.channel.send("Enter a valid number!");

        songRank = parseInt(args[0]);
        if (songRank < 1 || songRank > serverQueue.songs.length - 1)
            return message.channel.send("Number out of range!");
        else if (songRank < 2)
            return message.channel.send(
                `Song '${serverQueue.songs[songRank].title}' already at top!`
            );

        arrayMove.mutate(serverQueue.songs, songRank, 1);
        return message.channel.send(
            `Song '${serverQueue.songs[1].title}' moved to rank #1`
        );
    },
};

const validateNum = require('./_validateNumber');
const skip = require('./skip').execute;

module.exports = {
    name: 'remove',
    async execute(message, serverQueue) {
        if (!message.member.voice.channel)
            return message.channel.send(
                "You have to be in a voice channel to remove a song!"
            );
        else if (!serverQueue)
            return message.channel.send("There is no song that I could remove!");
        
        const rank = validateNum(message.args[0], 0, serverQueue.songs.length - 1)
        if (rank == 0) {
            return skip(message, serverQueue);
        }
        if (rank) {
            return serverQueue.songs.splice(rank, 1);
        } else {
            return message.channel.send("Verify the number you inserted!")
        }
        
    },
};

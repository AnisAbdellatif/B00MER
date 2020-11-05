const { MessageEmbed } = require("discord.js");
const { get } = require("request");

const getPlayTime = require('./_getPlayTime');

module.exports = {
    name: 'queue',
    async execute(message, serverQueue) {
        if (!serverQueue)
            return message.reply(
                "Oida mate, i have no shit to say :zany_face: (no songs)"
            );
        let songEmbed = new MessageEmbed()
            .setDescription("Song queue:")
            .setColor("#ff0000")
            .setThumbnail(serverQueue.songs[0].thumbnail);

        var n = 0;
        serverQueue.songs.forEach((song) => {
            songEmbed.addField(
                `#${n} - ${song.title}`,
                `Requested by: ${song.requestedBy}${n == 0 ? `; Played: ${getPlayTime(serverQueue)}/${song.duration}` : ''}`,
            );
            n += 1;
        });
        return serverQueue.textChannel.send(songEmbed);
    },
};

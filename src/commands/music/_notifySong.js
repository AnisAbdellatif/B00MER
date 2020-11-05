const { MessageEmbed } = require("discord.js");

const getPlayTime = require('./_getPlayTime');
const end = require("./_end");

module.exports = async (serverQueue, title, rank=0) => {
    if (!serverQueue || serverQueue.songs.length == 0) {
        return serverQueue.textChannel.send("Queue is empty!");
    }

    const song = serverQueue.songs[rank];
    let songEmbed = new MessageEmbed()
        .setDescription(title)
        .setColor("#ff0000")
        .setThumbnail(song.thumbnail)
        .addField("Song Name:", `${song.title}`, true)
        .addField("Requested By:", song.requestedBy, true)
        .addField("URL:", song.url);
    if (serverQueue.connection.dispatcher && serverQueue.songs[0].title == song.title && rank == 0) {
        songEmbed.addField(
            "Duration:",
            `${getPlayTime(serverQueue)}/${song.duration}`
        );
    } else {
        songEmbed.addField("Duration:", `${song.duration}`);
    }

    return serverQueue.textChannel.send(songEmbed);
}

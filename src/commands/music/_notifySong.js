import { MessageEmbed } from "discord.js";
import * as Errors from "../../customErrors.js";
import getPlayTime from "./_getPlayTime.js";

export default async (message, title, rank = 0) => {
    const serverQueue = message.client.serverQueue;
    if (!serverQueue || serverQueue.songs.length == 0) {
        throw new Errors.EmptyQueue();
    }

    const song = serverQueue.songs[rank];
    let songEmbed = new MessageEmbed()
        .setDescription(title)
        .setColor("#ff0000")
        .setThumbnail(song.thumbnail)
        .addField("Song Name:", `${song.title}`, true)
        .addField("Requested By:", song.requestedBy, true)
        .addField("URL:", song.url);
    if (
        serverQueue.connection.dispatcher &&
        serverQueue.songs[0].title == song.title &&
        rank == 0
    ) {
        songEmbed.addField(
            "Duration:",
            `${getPlayTime(serverQueue)}/${song.duration}`
        );
    } else {
        songEmbed.addField("Duration:", `${song.duration}`);
    }

    return serverQueue.textChannel.send(songEmbed);
};

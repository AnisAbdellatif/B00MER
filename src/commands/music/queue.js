import { MessageEmbed } from "discord.js";

import Command from "../../Command.js";
import getPlayTime from "./_getPlayTime.js";

class Queue extends Command {
    constructor() {
        super({
            name: "queue",
            description: "Get the song queue.",
        });
    }

    execute(message, args) {
        super.execute(message, args);

        const serverQueue = message.client.serverQueue;
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
                `Requested by: ${song.requestedBy}${
                    n == 0
                        ? `; Played: ${getPlayTime(serverQueue)}/${
                              song.duration
                          }`
                        : ""
                }`
            );
            n += 1;
        });
        return serverQueue.textChannel.send(songEmbed);
    }
}

export default new Queue();

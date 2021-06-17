import { mutate } from "array-move";

import Command from "../../Command.js";

class Move extends Command {
    constructor() {
        super({
            name: "move",
            description: "Move a song up in the queue.",
        });
    }

    execute(message, args) {
        let res = super.execute(message, args);
        if (res) return;

        const serverQueue = message.client.serverQueue;
        if (isNaN(this.args[0]) || isNaN(this.args[1]))
            return message.channel.send("Enter a valid number!");

        songRank = parseInt(this.args[0]);
        newSongRank = parseInt(this.args[1]);
        if (
            songRank < 1 ||
            songRank > serverQueue.songs.length - 1 ||
            newSongRank < 1 ||
            newSongRank > serverQueue.songs.length - 1
        )
            return message.channel.send("Number out of range!");

        mutate(serverQueue.songs, songRank, newSongRank);
        return message.channel.send(
            `Song '${serverQueue.songs[1].title}' moved to rank #${newSongRank}`
        );
    }
}

export default new Move();
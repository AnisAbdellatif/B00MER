import { mutate } from "array-move";

import Command from "../../Command.js";

class Move extends Command {
    constructor() {
        super({
            name: "move",
            description: "Move a song up in the queue.",
            usage: "[old song rank] [new song rank]",
        });
    }

    execute(message, args) {
        super.execute(message, args);

        const serverQueue = message.client.serverQueue;
        if (isNaN(this.args[0]) || isNaN(this.args[1]))
            throw new this.Errors.NumberUnvalid("NaN");

        songRank = parseInt(this.args[0]);
        newSongRank = parseInt(this.args[1]);
        if (
            songRank < 1 ||
            songRank > serverQueue.songs.length - 1 ||
            newSongRank < 1 ||
            newSongRank > serverQueue.songs.length - 1
        )
            throw new this.Errors.NumberUnvalid("range");

        mutate(serverQueue.songs, songRank, newSongRank);
        return message.channel.send(
            `Song '${serverQueue.songs[1].title}' moved to rank #${newSongRank}`
        );
    }
}

export default new Move();

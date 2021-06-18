import Command from "../../Command.js";
import skip from "./skip.js";

class Remove extends Command {
    constructor() {
        super({
            name: "remove",
            description: "Remove song from queue.",
            argsRules: {
                songRank: "required|integer",
            },
        });
    }

    treatArgs(args) {
        if (args) {
            return {
                songRank: args,
            };
        }
        return;
    }

    execute(message, args) {
        super.execute(message, args);

        const serverQueue = message.client.serverQueue;
        if (!message.member.voice.channel)
            return message.channel.send(
                "You have to be in a voice channel to remove a song!"
            );
        else if (!serverQueue)
            return message.channel.send(
                "There is no song that I could remove!"
            );

        const rank = this.args.songRank;
        if (!(serverQueue.songs.length > rank && rank >= 0)) {
            return message.channel.send("Verify the number you inserted!");
        } else if (rank == 0) {
            return skip.execute(message, args);
        } else {
            return serverQueue.songs.splice(rank, 1);
        }
    }
}

export default new Remove();

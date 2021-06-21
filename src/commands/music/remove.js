import Command from "../../Command.js";
import skip from "./skip.js";

class Remove extends Command {
    constructor() {
        super({
            name: "remove",
            description: "Remove song from queue.",
            usage: "[rank of the song to be removed]",
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
            throw new this.Errors.MemberNotInVoiceChannel();
        else if (!serverQueue) throw new this.Errors.EmptyQueue();

        const rank = this.args.songRank;
        if (isNaN(rank)) throw new this.Errors.NumberUnvalid("NaN");
        else if (!(serverQueue.songs.length > rank && rank >= 0)) {
            throw new this.Errors.NumberUnvalid("range");
        } else if (rank == 0) {
            return skip.execute(message, args);
        } else {
            return serverQueue.songs.splice(rank, 1);
        }
    }
}

export default new Remove();

import pollEmbed from "discord.js-poll-embed";
import Command from "../Command.js";

class Vote extends Command {
    constructor() {
        super({
            name: "vote",
            description: "Create a vote",
            usage:
                "vote [poll title] [array of available options (max 10)] [time in seconds]",
        });
    }

    treatArgs(args) {
        const title = args.shift();
        const options = eval(args.join("").split("]")[0] + "]");
        const timeout = args[args.length - 1];
        return [title, options, timeout];
    }

    execute(message, args) {
        let res = super.execute(message, args);
        if (res) return;

        // console.log(title);
        // console.log(options);
        // console.log(timeout);

        return pollEmbed(message, this.args[0], this.args[1], this.args[2]);
    }
}

export default new Vote();

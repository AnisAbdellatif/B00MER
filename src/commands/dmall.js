import Command from "../Command.js";
import Logger from "../Logger.js";

class Dmall extends Command {
    constructor() {
        super({
            name: "dmall",
            description: "Send dms to all members of the serve.",
            usage: "dmall <message>",
            permisions: ["MENTION_EVERYONE"],
        });
    }

    treatArgs(args) {
        return args.joint(" ");
    }

    async execute(message, args) {
        let res = super.execute(message, args);
        if (res) return;

        if (message.channel.type != "text") {
            message.channel.send(
                `This command can't execute in ${message.channel.type} channel type, please run it from a text channel`
            );
        }

        const members_success = [];
        const members_error = [];

        const f = message.guild.members.cache.map(async (member) => {
            if (member.user.bot || member.user.id == message.author.id) return;
            try {
                await member.user.send(this.args);
                members_success.push(member.user.username);
            } catch (error) {
                Logger.error(
                    `Could not send DM to ${member.user.username} in a request in ${message.guild.name} (${message.guild.id}).\n`,
                    error
                );
                members_error.push(member.user.username);
            }
        });
        Promise.all(f).then(() => {
            if (members_success.length > 0) {
                message.reply(
                    `The message reached those people:\n ${members_success}`
                );
            }
            if (members_error.length > 0) {
                message.reply(
                    `The message didn\'t reach those people:\n ${members_error}`
                );
            }
            Logger.debug(`success: ${members_success}`);
            Logger.debug(`failure: ${members_error}`);
        });
    }
}

export default new Dmall();

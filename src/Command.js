import Validator from "validatorjs";

class Command {
    constructor(args) {
        Object.keys(args).forEach((argKey) => (this[argKey] = args[argKey]));
    }

    execute(message, args) {
        if (this.treatArgs) {
            this.args = this.treatArgs(args);
        } else {
            this.args = args;
        }

        if (message.client.botConfig.disabledCmds.includes(this.name)) {
            return message.reply(
                `Sorry, this command is currently disabled by the developer \:pleading_face:\nFor more information contact <@${message.client.dev}>`
            );
        } else if (message.channel.type == "dm" && !this.dm) {
            return message.reply(
                "I can only execute this command inside a server! :wink:"
            );
        } else if (this.dev && message.author.id != message.client.dev) {
            return message.reply(
                `You are not allow to do that -_- Ask <@${message.client.dev}> to do it.`
            );
        } else if (
            this.permissions &&
            !message.member.hasPermission(this.permissions)
        ) {
            return message.reply(
                `You don't have permission to execute that command!`
            );
        } else if (
            this.botpermissions &&
            !message.guild
                .member(message.client.user)
                .hasPermission(this.permissions)
        ) {
            return message.reply(
                `Give me the permission to execute that command!`
            );
        } else if (this.argsRules) {
            console.log(this.args);
            console.log(this.argsRules);
            let val = new Validator(this.args, this.argsRules);
            if (val.fails()) {
                return message.reply(
                    `Give me the right number of arguments for this command to function!`
                );
            }
        }
    }
}

export default Command;

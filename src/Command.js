import Validator from "validatorjs";

import * as Errors from "./customErrors.js";

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
            throw new Errors.DisabledCmdError(
                `Sorry, this command is currently disabled by the developer \:pleading_face:\nFor more information contact <@${message.client.dev}>`
            );
        } else if (message.channel.type == "dm" && !this.dm) {
            throw new Errors.DmChannelError(
                "I can only execute this command inside a server! :wink:"
            );
        } else if (this.dev && message.author.id != message.client.dev) {
            throw new Errors.DevelopperError(
                `You are not allowed to do that -_- Ask <@${message.client.dev}> to do it.`
            );
        } else if (
            this.permissions &&
            !message.member.hasPermission(this.permissions)
        ) {
            throw new Errors.UserPermissionError(
                `You don't have permission to execute that command!`
            );
        } else if (
            this.botpermissions &&
            !message.guild
                .member(message.client.user)
                .hasPermission(this.permissions)
        ) {
            throw new Errors.BotPermissionError(
                `Give me the permission to execute that command!`
            );
        } else if (this.argsRules) {
            let val = new Validator(this.args, this.argsRules);
            if (val.fails()) {
                // console.log(val.errors.all());
                throw new Errors.ArgumentsError(
                    `Error in command arguments! Check $help for more info.`
                );
            }
        }
    }
}

export default Command;

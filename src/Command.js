import Validator from "validatorjs";

import Logger from "./Logger.js";
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
            throw new Errors.DisabledCmdError();
        } else if (message.channel.type == "dm" && !this.dm) {
            throw new Errors.DmChannelError();
        } else if (this.dev && message.author.id != message.client.dev) {
            throw new Errors.DevelopperError();
        } else if (
            this.permissions &&
            !message.member.hasPermission(this.permissions)
        ) {
            throw new Errors.UserPermissionError();
        } else if (
            this.botpermissions &&
            !message.guild
                .member(message.client.user)
                .hasPermission(this.permissions)
        ) {
            throw new Errors.BotPermissionError();
        } else if (this.argsRules) {
            let val = new Validator(this.args, this.argsRules);
            if (val.fails()) {
                // console.log(val.errors.all());
                throw new Errors.ArgumentsError();
            }
        }

        this.Logger = Logger;
        this.Errors = Errors;
    }
}

export default Command;

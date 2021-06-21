export class CustomError extends Error {
    constructor(message, stack = undefined) {
        super(message);
        if (stack) {
            this.stack = stack;
        }
    }
}

export class CommandNotFound extends CustomError {
    constructor() {
        super(`This command sadly does not exist! \:face_with_monocle:`);
    }
}

export class UserPermissionError extends CustomError {
    constructor() {
        super("You don't have permission to execute that command!");
    }
}

export class BotPermissionError extends CustomError {
    constructor() {
        super("Give me the permission to execute that command!");
    }
}

export class ArgumentsError extends CustomError {
    constructor() {
        super("Error in command arguments! Check $help for more info.");
    }
}

export class DisabledCmdError extends CustomError {
    constructor() {
        super(
            "Sorry, this command is currently disabled by the developer :pleading_face:\nFor more information contact <@343013591232020490>"
        );
    }
}

export class DmChannelError extends CustomError {
    constructor() {
        super("I can only execute this command inside a server! :wink:");
    }
}

export class DmInability extends CustomError {
    constructor(toWho) {
        super(`Could not send DM to <@${toWho}>!`);
    }
}

export class DevelopperError extends CustomError {
    constructor() {
        super(
            "You are not allowed to do that -_- Ask <@343013591232020490> to do it."
        );
    }
}

export class EmptyQueue extends CustomError {
    constructor() {
        super("Oida mate, i have no shit to say :zany_face: (empty queue)");
    }
}

export class SongNameNotSpecified extends CustomError {
    constructor() {
        super("You presented no song name to look for!");
    }
}

export class NumberUnvalid extends CustomError {
    constructor(issue) {
        let message;
        if (issue == "NaN") message = "Your input was not a vlid number!";
        else if (issue == "range") message = "Number out of range!";

        super(message);
    }
}

export class MemberNotInVoiceChannel extends CustomError {
    constructor() {
        super("You need to be in a voice channel to do that!");
    }
}

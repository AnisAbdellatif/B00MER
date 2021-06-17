export class CustomError extends Error {
    constructor(message) {
        super(message);
    }
}

export class UserPermissionError extends CustomError {
    constructor(message) {
        super(message);
    }
}

export class BotPermissionError extends CustomError {
    constructor(message) {
        super(message);
    }
}

export class ArgumentsError extends CustomError {
    constructor(message) {
        super(message);
    }
}

export class DisabledCmdError extends CustomError {
    constructor(message) {
        super(message);
    }
}

export class DmChannelError extends CustomError {
    constructor(message) {
        super(message);
    }
}

export class DevelopperError extends CustomError {
    constructor(message) {
        super(message);
    }
}

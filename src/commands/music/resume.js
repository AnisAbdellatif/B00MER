import Command from "../../Command.js";

class Resume extends Command {
    constructor() {
        super({
            name: "resume",
            description: "Resume the player.",
        });
    }

    execute(message, args) {
        super.execute(message, args);

        const serverQueue = message.client.serverQueue;

        if (!serverQueue) throw new this.Errors.EmptyQueue();

        serverQueue.connection.dispatcher.resume();
        serverQueue.connection.dispatcher.pause();
        serverQueue.connection.dispatcher.resume();
    }
}

export default new Resume();

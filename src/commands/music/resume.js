import Command from "../../Command.js";
import Logger from "../../Logger.js";

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

        if (!serverQueue)
            return message.reply(
                "Oida mate, i have no shit to say :zany_face: (no songs)"
            );

        serverQueue.connection.dispatcher.resume();
        serverQueue.connection.dispatcher.pause();
        serverQueue.connection.dispatcher.resume();
    }
}

export default new Resume();

import Command from "../../Command.js";

class Pause extends Command {
    constructor() {
        super({
            name: "pause",
            description: "Pause the player.",
        });
    }

    execute(message, args) {
        let res = super.execute(message, args);
        if (res) return;

        const serverQueue = message.client.serverQueue;
        if (!serverQueue)
            return message.reply(
                "Oida mate, i have no shit to say :zany_face: (no songs)"
            );
        return serverQueue.connection.dispatcher.pause();
    }
}

export default new Pause();

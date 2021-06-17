import Command from "../../Command.js";
import end from "./_end.js";

class Stop extends Command {
    constructor() {
        super({
            name: "stop",
            description: "Stop the player.",
        });
    }

    async execute(message, args) {
        super.execute(message, args);

        const serverQueue = message.client.serverQueue;
        if (!message.member.voice.channel)
            return message.channel.send(
                "You have to be in a voice channel to stop the music!"
            );
        await end(serverQueue);
    }
}

export default new Stop();

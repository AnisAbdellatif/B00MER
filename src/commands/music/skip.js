import Command from "../../Command.js";

class Skip extends Command {
    constructor() {
        super({
            name: "skip",
            description: "Skip the current song.",
        });
    }

    execute(message, args) {
        super.execute(message, args);

        const serverQueue = message.client.serverQueue;
        if (!message.member.voice.channel)
            return message.channel.send(
                "You have to be in a voice channel to skip a song!"
            );
        if (!serverQueue)
            return message.channel.send("There is no song that I could skip!");
        serverQueue.connection.dispatcher.end();
    }
}

export default new Skip();

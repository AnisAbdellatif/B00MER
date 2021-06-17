import Command from "../../Command.js";

class SkipTo extends Command {
    constructor() {
        super({
            name: "skipTo",
            description: "Skip to certain song.",
        });
    }

    execute(message, args) {
        super.execute(message, args);

        const serverQueue = message.client.serverQueue;
        if (!message.member.voice.channel)
            return message.channel.send(
                "You have to be in a voice channel to skip to a song!"
            );

        if (!serverQueue)
            return message.channel.send("There is no song that I could skip!");
        else if (
            parseInt(this.args[0]) < 1 ||
            parseInt(this.args[0]) > serverQueue.songs.length - 1
        ) {
            return message.channel.send(
                "The number you chose doesn't exist in queue!"
            );
        }

        serverQueue.songs.splice(0, parseInt(this.args[0]) - 1);
        serverQueue.connection.dispatcher.end();
    }
}

export default new SkipTo();

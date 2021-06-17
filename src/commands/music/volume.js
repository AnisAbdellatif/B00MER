import Command from "../../Command.js";

class Volume extends Command {
    constructor() {
        super({
            name: "volume",
            description: "Set player Volume.",
            argsRules: {
                volume: "integer|min:0|max:100",
            },
        });
    }

    treatArgs(args) {
        if (args && args.length > 0) {
            return { volume: args[0] };
        }
        return;
    }

    execute(message, args) {
        super.execute(message, args);

        const serverQueue = message.client.serverQueue;

        if (!serverQueue || !serverQueue.connection)
            return message.channel.send("You are not listening to music.");
        else if (this.args == undefined)
            return message.channel.send(
                `Current music volume is set to: ${
                    serverQueue.connection.dispatcher.volume * 100
                }`
            );

        const volume = this.args.volume;

        serverQueue.connection.dispatcher.setVolume(volume / 100);
        serverQueue.volume = volume;
        message.channel.send(`Music volume set to ${volume}`);
    }
}

export default new Volume();

import Command from "../Command.js";

class Mute extends Command {
    constructor() {
        super({
            name: "mute",
            description: "Mute everyone in your voice channel.",
            permissions: ["MUTE_MEMBERS"],
            botpermissions: ["MUTE_MEMBERS"],
        });
    }

    execute(message, args) {
        super.execute(message, args);

        const channel = message.member.voice.channel;
        for (let member of channel.members) {
            if (member[1].user.bot) continue;
            member[1].voice.setMute(true);
        }
    }
}

export default new Mute();

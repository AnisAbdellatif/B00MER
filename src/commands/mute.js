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
        let res = super.execute(message, args);
        if (res) return;

        const channel = message.member.voice.channel;
        for (let member of channel.members) {
            if (member[1].user.bot) continue;
            member[1].voice.setMute(true);
        }
    }
}

export default new Mute();

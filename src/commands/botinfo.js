import { MessageEmbed } from "discord.js";

import Command from "../Command.js";

class Botinfo extends Command {
    constructor() {
        super({
            name: "botinfo",
            description: "A list of bot information.",
            dm: true,
        });
    }

    execute(message, args) {
        let res = super.execute(message, args);
        if (res) return;

        let boticon = message.client.user.displayAvatarURL();
        let botembed = new MessageEmbed()
            .setDescription("Bot Information")
            .setColor("#00ff00")
            .setThumbnail(boticon)
            .addField("Bot Name", message.client.user.username)
            .addField("Created on", message.client.user.createdAt)
            .addField("Created by", `<@${message.client.dev}>`);
        return message.channel.send(botembed);
    }
}

export default new Botinfo();

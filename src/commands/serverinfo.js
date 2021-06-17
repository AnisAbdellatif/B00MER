import { MessageEmbed } from "discord.js";

import Command from "../Command.js";

class Serverinfo extends Command {
    constructor() {
        super({
            name: "serverinfo",
            description: "A list of server information.",
        });
    }

    execute(message, args) {
        super.execute(message, args);

        let sicon = message.guild.iconURL();
        let serverembed = new MessageEmbed()
            .setDescription("Server Information")
            .setColor("#00ff00")
            .setThumbnail(sicon)
            .addField("Server Name", message.guild.name)
            .addField("Created on", message.guild.createdAt)
            .addField("You joined", message.member.joinedAt)
            .addField("Total members", message.guild.memberCount);
        return message.channel.send(serverembed);
    }
}

export default new Serverinfo();

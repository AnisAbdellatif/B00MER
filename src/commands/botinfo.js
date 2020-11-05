const Discord = require("discord.js");

module.exports = {
    name: 'botinfo',
    description: 'A list of bot information',
    dm: true,
    execute(message, args) {
        let boticon = message.client.user.displayAvatarURL();
        let botembed = new Discord.MessageEmbed()
            .setDescription("Bot Information")
            .setColor("#00ff00")
            .setThumbnail(boticon)
            .addField("Bot Name", message.client.user.username)
            .addField("Created on", message.client.user.createdAt)
            .addField("Created by", `<@${message.client.dev}>`);
        return message.channel.send(botembed);
    },
};

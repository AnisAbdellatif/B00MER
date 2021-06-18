import Command from "../Command.js";

class Prefix extends Command {
    constructor() {
        super({
            name: "prefix",
            description: "Changes the prefix used in commands.",
            usage: "<new prefix>",
            permissions: ["ADMINISTRATOR"],
        });
    }

    async execute(message, args) {
        super.execute(message, args);

        const client = message.client;
        if (!message.guild.id)
            return message.channel.send(
                `The bot prefix is: ${client.guildConfig.prefix}`
            );

        let guild = await client.keyv.get(message.guild.id);
        if (!this.args.length) {
            return message.channel.send(
                `The current prefix is: ${guild.prefix}`
            );
        } else {
            guild.prefix = this.args.join(" ");
            await client.keyv.set(message.guild.id, guild);

            return message.channel.send(
                `The prefix was changed to: '${this.args.join(" ")}'`
            );
        }
    }
}

export default new Prefix();

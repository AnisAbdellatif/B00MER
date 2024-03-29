import Command from "../Command.js";

class Clear extends Command {
    constructor() {
        super({
            name: "clear",
            description:
                "Clears messages in the current channel. (deletes all if not specified)",
            usage: "([number of messages to delete])",
            permissions: ["MANAGE_MESSAGES"],
            botpermissions: ["MANAGE_MESSAGES"],
            dev: true,
        });
    }

    async execute(message, args) {
        super.execute(message, args);

        if (message.channel.type == "text") {
            const n = this.args[0] || 10;
            while (true) {
                await message.channel.messages.fetch({ limit: n }, true, true);
                const messages = await message.channel.bulkDelete(n, true);
                this.Logger.debug(
                    `deleted ${messages.size} messages from '${message.guild.name}'!`
                );
                if (
                    this.args[0] ||
                    (await message.channel.messages.cache.array().length) == 0
                )
                    break;
            }
        }
    }
}

export default new Clear();

import Command from "../Command.js";
import Logger from "../Logger.js";

class Clear extends Command {
    constructor() {
        super({
            name: "clear",
            description: "Clears all the messages in the current channel.",
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
                Logger.debug(
                    `deleted ${messages.size} messages from '${mesage.guild.name}'!`
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

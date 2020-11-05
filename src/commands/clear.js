module.exports = {
    name: "clear",
    description: "clears all the messages in the current channel",
    permissions: ["MANAGE_MESSAGES"],
    botpermissions: ["MANAGE_MESSAGES"],
    dev: true,
    async execute(message, args) {
        if (message.channel.type == "text") {
            const n = args[0] || 10;
            while (true) {                await message.channel.messages.fetch({ limit: n }, true, true);
                const messages = await message.channel.bulkDelete(n, true);
                console.log(`deleted ${messages.size} messages!`);
                if (message.channel.messages.cache.array().length == 0) break;
                else if (args[0]) break;
            }
        }
    },
};
import Command from "../../Command.js";

class getRole extends Command {
    constructor() {
        super({
            name: "getRole",
            description: "Get the role allowed to play music.",
        });
    }

    async execute(message, args) {
        let res = super.execute(message, args);
        if (res) return;

        guildDB = await message.client.keyv.get(message.guild.id);
        let role;
        if (guildDB.musicRole)
            role = message.guild.roles.cache.get(guildDB.musicRole);

        message.reply(
            `Role allowed to execute music command: ${
                role ? "<@&" + role.id + ">" : "@everyone"
            }`
        );
    }
}

export default new getRole();

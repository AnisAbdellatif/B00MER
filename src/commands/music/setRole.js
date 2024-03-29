import Command from "../../Command.js";

class setRole extends Command {
    constructor() {
        super({
            name: "setRole",
            description:
                "Sets the minimum role required to manage music in the server.",
            usage: "[@tag of the new role]",
            permissions: ["MANAGE_GUILD", "MANAGE_ROLES"],
        });
    }

    async execute(message, args) {
        super.execute(message, args);

        if (!message.mentions.roles) throw new this.Errors.ArgumentsError();

        let guild = await message.client.keyv.get(message.guild.id);
        let role;

        if (message.mentions.everyone) {
            delete guild.musicRole;
        } else {
            role = message.mentions.roles.first();
            guild.musicRole = role.id;
        }

        await message.client.keyv.set(message.guild.id, guild);
        return message.reply(
            `Music role is set as: ${
                role ? "<@&" + role.id + ">" : "@everyone"
            } !`
        );
    }
}

export default new setRole();

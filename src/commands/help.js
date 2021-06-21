import Command from "../Command.js";

class Help extends Command {
    constructor() {
        super({
            name: "help",
            description:
                "List all of my commands or info about a specific command.",
            usage: "([command name])",
            dm: true,
        });
    }

    async execute(message, args) {
        super.execute(message, args);

        const data = [];
        let { commands } = message.client;
        const prefix =
            message.channel.type == "dm"
                ? message.client.guildConfig.prefix
                : (await message.client.keyv.get(message.guild.id)).prefix;

        if (!this.args.length) {
            data.push("Here's a list of all my commands:\n");
            commands = commands.filter((cmd) => cmd.name != "help");
            data.push(
                commands
                    .map((command) => {
                        // if (command.name === "help") return;
                        return `**${command.name}**: ${command.description}`;
                    })
                    .join("\n\n")
            );
            data.push(
                `\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`
            );

            return message.author
                .send(data)
                .then(() => {
                    if (message.channel.type === "dm") return;
                    message.reply("I've sent you a DM with all my commands!");
                })
                .catch((error) => {
                    console.error(
                        `Could not send help DM to ${message.author.tag}.\n`,
                        error
                    );
                    message.reply(
                        "it seems like I can't DM you! Do you have DMs disabled?"
                    );
                });
        }

        const name = this.args[0].toLowerCase();
        let command = commands.get(name);

        if (!command) {
            command = message.client.commands.find(
                (cmd) => cmd.aliases && cmd.aliases.includes(name)
            );
            if (!command) {
                throw new this.Errors.CommandNotFound();
            }
            command = command.children.get(name);
        }

        data.push(`<Name>: ${command.name}`);

        if (command.aliases)
            data.push(`<Aliases>: ${command.aliases.join(", ")}`);
        if (command.description)
            data.push(`<Description>: ${command.description}`);
        if (command.usage)
            data.push(
                `<Usage>: ${prefix}${command.name} ${
                    command.usage ? command.usage : ""
                }`
            );

        // data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);
        message.channel.send(data, { split: true });
    }
}

export default new Help();

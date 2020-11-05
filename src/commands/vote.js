const pollEmbed = require('discord.js-poll-embed');

module.exports = {
    name: 'vote',
    description: 'Create a vote',
    usage: '[poll title] [array of available options (max 10)] [time in seconds]',
    execute(message, args) {
        return pollEmbed(message, args[0], JSON.parse(args[1]), args[2]);

    }
}

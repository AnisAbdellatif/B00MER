const execute = require('./_execute');

module.exports = {
    name: 'seek',
    async execute(message, serverQueue) {
        const args = message.args;
        execute(serverQueue, args[0]);
    },
};

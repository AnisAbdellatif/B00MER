const notifySong = require('./_notifySong');

module.exports = {
    name: 'np',
    async execute(message, serverQueue) {
        notifySong(serverQueue, "Now Playing:");
    },
};

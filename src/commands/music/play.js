const getSong = require('./_getSong');
const notifySong = require('./_notifySong');
const execute = require('./_execute');

module.exports = {
    name: 'play',
    async execute(message, serverQueue) {
        const args = message.args;

        let songs = await args.join(" ").split("|");
        if (!songs) return message.reply("You didn't give me a song to play!");

        if (!serverQueue || !serverQueue.connection) {
            let voiceChannel;
            if (message.client.voice.connections.array().length > 0 && [...message.client.voice.connections.keys()].includes(message.guild.id)) {
                voiceChannel = message.client.voice.connections.get(message.guild.id).channel
            } else {
                voiceChannel = message.member.voice.channel;
                if (!voiceChannel) {
                    return message.reply("You need to be in a voice channel to play music!");
                } else if (!voiceChannel.joinable || !voiceChannel.speakable) {
                    return message.reply(
                        "I need the permissions to join and speak in your voice channel!"
                    );
                }
            }

            const queueContruct = {
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: undefined,
                client: message.client,
                guildId: message.guild.id,
                songs: [],
                volume: serverQueue && serverQueue.volume ? serverQueue.volume : 50,
                playing: true,
            };

            queueContruct.connection = await voiceChannel.join();

            await message.client.queue.set(message.guild.id, queueContruct);
            serverQueue = queueContruct;
        }

        for (let i = 0; i < songs.length; i++) {
            song = songs[i].trim();
            song = await getSong(song);
            song.requestedBy = message.author.username;
            serverQueue.songs.push(song);

            notifySong(serverQueue, "New song added to queue:", serverQueue.songs.length - 1);
            if (serverQueue.songs.length == 1) execute(serverQueue);
        }
    },
};

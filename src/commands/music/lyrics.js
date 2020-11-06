const { MessageEmbed } = require("discord.js");
const Genius = require('genius-lyrics-api');

module.exports = {
    name: 'lyrics',
    async execute(message, serverQueue) {
        let query = message.args.join(' ');

        if (query.length == 0) {
            if (!serverQueue || serverQueue.songs.length == 0) {
                return message.channel.send("No songs in queue!");
            }
            query = serverQueue.songs[0].title;
        }

        if (query.indexOf('[') > -1) query = query.substring(0, query.indexOf('['));
        const artist = query.split('-')[0].trim();
        const title = query.split('-')[1] ? query.split('-')[1].trim() : undefined;

        const options = {
            apiKey: process.env.GENIUS_API_KEY,
            artist: title ? artist : '',
            title: title ? title : query,
            optimizeQuery: true
        };

        console.log(options);
        let song = await Genius.searchSong(options);
        song = song[0];
        const lyrics = await Genius.getLyrics(song.url);

        const embed = new MessageEmbed()
            .setTitle(`Lyrics for ${song.title}`)
            .setThumbnail(song.albumArt);

        var string = chunkString(lyrics, 1024);
        string.forEach(function (item, index) {
            embed.addField('\u200b', item)
        });

        return message.channel.send(embed);
    },
};

//function to split the song lyrics if they are too long
function chunkString(str, len) {
    const size = Math.ceil(str.length / len)
    const r = Array(size)
    let offset = 0

    for (let i = 0; i < size; i++) {
        r[i] = str.substr(offset, len)
        offset += len
    }

    return r
}
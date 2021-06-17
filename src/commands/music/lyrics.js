import { MessageEmbed } from "discord.js";
import { searchSong, getLyrics } from "genius-lyrics-api";

import Command from "../../Command.js";

class Lyrics extends Command {
    constructor() {
        super({
            name: "lyrics",
            description: "Shows the lyrics of a song.",
            usage: "lyrics <artist_name - song_name (optional)>",
            argsRules: {
                query: ["string", "regex:/-/g"],
            },
        });
    }

    treatArgs(args) {
        if (args && args.length > 0) {
            return { query: args.join(" ") };
        }
        return;
    }

    async execute(message, args) {
        super.execute(message, args);

        const serverQueue = message.client.serverQueue;
        let query = this.args.query;

        if (!query) {
            if (!serverQueue || serverQueue.songs.length == 0) {
                return message.channel.send("No songs in queue!");
            }
            query = serverQueue.songs[0].title;
        }

        if (query.indexOf("[") > -1)
            query = query.substring(0, query.indexOf("["));
        const artist = query.split("-")[0].trim();
        const title = query.split("-")[1]
            ? query.split("-")[1].trim()
            : undefined;

        const options = {
            apiKey: process.env.GENIUS_API_KEY,
            artist: title ? artist : "",
            title: title ? title : query,
            optimizeQuery: true,
        };

        let song = await searchSong(options);
        song = song[0];
        const lyrics = await getLyrics(song.url);

        const embed = new MessageEmbed()
            .setTitle(`Lyrics for ${song.title}`)
            .setThumbnail(song.albumArt);

        var string = chunkString(lyrics, 1024);
        string.forEach(function (item, index) {
            embed.addField("\u200b", item);
        });

        return message.channel.send(embed);
    }
}

export default new Lyrics();

//function to split the song lyrics if they are too long
function chunkString(str, len) {
    const size = Math.ceil(str.length / len);
    const r = Array(size);
    let offset = 0;

    for (let i = 0; i < size; i++) {
        r[i] = str.substr(offset, len);
        offset += len;
    }

    return r;
}

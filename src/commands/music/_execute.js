import ytdl from "ytdl-core";
import end from "./_end.js";
import notifySong from "./_notifySong.js";

const f = async (message, args, seek) => {
    const serverQueue = message.client.serverQueue;
    const song = serverQueue.songs[0];
    if (!song) return;
    const stream = await ytdl(song.url, {
        filter: "audioonly",
        quality: "highestaudio",
    });
    // const stream = await ytdl(song.url, { quality: "highestaudio", filter: "audioonly", highWaterMark: 50 });

    const dispatcher = serverQueue.connection
        .play(stream, {
            highWaterMark: 25,
            seek: seek,
        })
        .on("finish", () => {
            serverQueue.songs.shift();
            notifySong(message, "Now Playing:");
            f(serverQueue);
        })
        .on("error", (error) => {
            console.error(error);
            end(serverQueue, true);
        });
    dispatcher.setVolume(serverQueue.volume / 100);
};

export default async (message, args, seek = 0) => f(message, args, seek);

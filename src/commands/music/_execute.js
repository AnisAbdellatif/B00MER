const ytdl = require("ytdl-core");
const end = require("./_end");
const notifySong = require('./_notifySong');

const f = async (serverQueue, seek) => {
    const song = serverQueue.songs[0];
    if (!song) return;
    const stream = await ytdl(song.url, { filter: "audioonly", quality: "highestaudio" });
    // const stream = await ytdl(song.url, { quality: "highestaudio", filter: "audioonly", highWaterMark: 50 });

    const dispatcher = serverQueue.connection
        .play(
            stream,
            {
                highWaterMark: 25,
                seek: seek
            }
        )
        .on("finish", () => {
            serverQueue.songs.shift();
            notifySong(serverQueue, "Now Playing:");
            f(serverQueue);
        })
        .on("error", (error) => {
            console.error(error);
            end(serverQueue, true);
        });
    dispatcher.setVolume(serverQueue.volume / 100);
};

module.exports = async (serverQueue, seek=0) => f(serverQueue, seek);
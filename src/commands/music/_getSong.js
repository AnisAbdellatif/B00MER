const entities = new (require("html-entities").XmlEntities)();
const Youtube = new (require("popyt").YouTube)(process.env.YOUTUBE_API_KEY);

module.exports = async (song) => {
    const songInfo = await Youtube.getVideo(song);
    console.log(entities.decode(songInfo.title));
    return {
        title: entities.decode(songInfo.title),
        url: songInfo.url,
        thumbnail: songInfo.thumbnails.maxres
            ? songInfo.thumbnails.maxres.url
            : songInfo.thumbnails.high.url,
        duration: `${songInfo.minutes}m ${songInfo.seconds}s`,
    };
}
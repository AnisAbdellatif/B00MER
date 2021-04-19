import { decode } from "html-entities";
import { YouTube } from "popyt";
const YoutubeAPI = new YouTube(process.env.YOUTUBE_API_KEY);

export default async (song) => {
    const songInfo = await YoutubeAPI.getVideo(song);
    return {
        title: decode(songInfo.title),
        url: songInfo.url,
        thumbnail: songInfo.thumbnails.maxres
            ? songInfo.thumbnails.maxres.url
            : songInfo.thumbnails.high.url,
        duration: `${songInfo.minutes}m ${songInfo.seconds}s`,
    };
};

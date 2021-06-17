import Logger from "../../Logger.js";

export default async (serverQueue, err = false) => {
    serverQueue.songs = [];
    try {
        await serverQueue.connection.dispatcher.removeAllListeners("finish");
        await serverQueue.connection.dispatcher.end();
    } catch (err) {
        Logger.error("error removing listeners on _end!");
    }

    serverQueue.voiceChannel.leave();
    serverQueue.textChannel.send(
        `Ight, Imma head out :yawning_face: ${err ? "(due to an error)" : ""}`
    );
    serverQueue.connection = undefined;
};

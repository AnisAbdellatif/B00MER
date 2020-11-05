module.exports = async (serverQueue, err = false) => {
    serverQueue.songs = [];
    try {
        await serverQueue.connection.dispatcher.removeAllListeners("finish");
        await serverQueue.connection.dispatcher.end();
    } catch (err) {
        console.log("error removing listeners on _end!");
    }
    
    serverQueue.voiceChannel.leave();
    serverQueue.textChannel.send(`Ight, Imma head out :yawning_face: ${err ? "(due to an error)" : ""}`);
    // serverQueue.client.queue.delete(serverQueue.guildId);
    serverQueue.connection = undefined;
    // await serverQueue.client.queue.set(serverQueue.guildId, serverQueue);
}
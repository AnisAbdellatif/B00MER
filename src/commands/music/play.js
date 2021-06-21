import Command from "../../Command.js";

import getSong from "./_getSong.js";
import notifySong from "./_notifySong.js";
import execute from "./_execute.js";

class Play extends Command {
    constructor() {
        super({
            name: "play",
            description: "Play a song.",
            usage: "[song name(s)] (if multiple songs seperate them with '|')",
            argsRules: {
                songName: "required|array",
            },
        });
    }

    treatArgs(args) {
        if (args) {
            return {
                songName: args.join(" ").split("|"),
            };
        }
        return;
    }

    async execute(message, args) {
        super.execute(message, args);

        let serverQueue = message.client.serverQueue;
        let songs = this.args.songName;

        if (!serverQueue || !serverQueue.connection) {
            let voiceChannel;
            if (
                message.client.voice.connections.array().length > 0 &&
                [...message.client.voice.connections.keys()].includes(
                    message.guild.id
                )
            ) {
                voiceChannel = message.client.voice.connections.get(
                    message.guild.id
                ).channel;
            } else {
                voiceChannel = message.member.voice.channel;
                if (!voiceChannel) {
                    throw new this.Errors.MemberNotInVoiceChannel();
                } else if (!voiceChannel.joinable || !voiceChannel.speakable) {
                    throw new this.Errors.BotPermissionError();
                }
            }

            const queueContruct = {
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: undefined,
                client: message.client,
                guildId: message.guild.id,
                songs: [],
                volume:
                    serverQueue && serverQueue.volume ? serverQueue.volume : 50,
                playing: true,
            };

            queueContruct.connection = await voiceChannel.join();
            queueContruct.connection.on("disconnect", () => {
                console.log("Bot disconnected!");
                message.client.queue.delete(message.guild.id);
            });

            await message.client.queue.set(message.guild.id, queueContruct);
            message.client.serverQueue = queueContruct;
            serverQueue = message.client.serverQueue;
        }

        for (let i = 0; i < songs.length; i++) {
            let song = songs[i].trim();
            song = await getSong(song);
            song.requestedBy = message.author.username;
            serverQueue.songs.push(song);

            notifySong(
                message,
                "New song added to queue:",
                serverQueue.songs.length - 1
            );
        }
        if (serverQueue.songs.length == 1) execute(message, args);
    }
}

export default new Play();

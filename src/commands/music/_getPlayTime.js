import prettyMilliseconds from "pretty-ms";

export default (serverQueue) => {
    return prettyMilliseconds(serverQueue.connection.dispatcher.streamTime, {
        secondsDecimalDigits: 0,
    });
};

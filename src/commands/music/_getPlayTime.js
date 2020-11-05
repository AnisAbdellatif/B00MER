const prettyMilliseconds = require("pretty-ms");

module.exports = (serverQueue) => {
    return prettyMilliseconds(serverQueue.connection.dispatcher.streamTime, { secondsDecimalDigits: 0 })
}
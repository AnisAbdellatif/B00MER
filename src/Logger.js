import winston from "winston";
import colors from "colors/safe.js";
import { config } from "dotenv";

config();

const TimestampColorFormat = winston.format((info, opts) => {
    if (info.timestamp) {
        let color = colors.green;

        if (opts && opts.color && colors[opts.color]) {
            color = colors[opts.color];
        }

        info.timestamp = color(info.timestamp);
        return info;
    }
});

const errorStackFormat = winston.format((info) => {
    if (info.stack) {
        info.message = info.stack.slice(info.stack.indexOf(":") + 2);
    }
    return info;
});

const logConfiguration = {
    level: process.env.NODE_ENV == "dev" ? "debug" : "info",
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.timestamp({
            format: "MMM-DD-YYYY HH:mm:ss",
        }),
        TimestampColorFormat(),
        errorStackFormat(),
        winston.format.colorize({ all: true }),
        winston.format.printf(
            (info) => `${[info.timestamp]} ${info.level}: ${info.message}`
        )
    ),
};

const logger = winston.createLogger(logConfiguration);
winston.addColors({
    error: "red",
    warn: "yellow",
    info: "cyan",
    debug: "green",
});

export default process.env.NODE_ENV == "dev" ? logger : console;

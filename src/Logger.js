import winston from "winston";
import colors from "colors/safe.js";
import { config } from "dotenv";

config();

const myFormat = winston.format((info, opts) => {
    if (info.timestamp) {
        let color = colors.green;

        if (opts && opts.color && colors[opts.color]) {
            color = colors[opts.color];
        }

        info.timestamp = color(info.timestamp);
        return info;
    }
});

const logConfiguration = {
    level: process.env.NODE_ENV == "dev" ? "debug" : "info",
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.timestamp({
            format: "MMM-DD-YYYY HH:mm:ss",
        }),
        myFormat(),
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

export default logger;

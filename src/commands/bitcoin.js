import { MessageEmbed } from "discord.js";
import request from "request";

import Command from "../Command.js";
import Logger from "../Logger.js";

class Bitcoin extends Command {
    constructor() {
        super({
            name: "bitcoin",
            description: "Shows the current bitcoin prices.",
        });
    }

    execute(message, args) {
        super.execute(message, args);

        request(
            "https://api.coindesk.com/v1/bpi/currentprice.json",
            { json: true },
            async function (error, response, body) {
                if (error) {
                    message.reply("Error getting the bitcoin prices!");
                    return Logger.error(error);
                }

                const updated = body.time.updated;
                const usd = body.bpi.USD.rate;
                const eur = body.bpi.EUR.rate;

                let boticon =
                    "https://bitcoin.org/img/icons/opengraph.png?1566407165";
                const bitcoinEmbed = new MessageEmbed()
                    .setColor("#e3ab12")
                    .setTitle("Bitcoin Prices")
                    .setDescription("Current bitcoin prices:")
                    .setThumbnail(boticon)
                    .addField("Update time", updated)
                    .addField("USD", usd)
                    .addField("EUR", eur);

                request(
                    "https://api.coindesk.com/v1/bpi/currentprice/TND.json",
                    { json: true },
                    async function (error, response, body) {
                        if (error) {
                            message.reply("Error getting the bitcoin prices!");
                            return Logger.error(error);
                        }

                        const tnd = body.bpi.TND.rate;
                        bitcoinEmbed.addField("TND", tnd);
                        return message.channel.send(bitcoinEmbed);
                    }
                );
            }
        );
    }
}

export default new Bitcoin();

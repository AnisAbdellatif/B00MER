import { MessageEmbed } from "discord.js";
import got from "got";

import Command from "../Command.js";

class Bitcoin extends Command {
    constructor() {
        super({
            name: "bitcoin",
            description: "Shows the current bitcoin prices.",
        });
    }

    async execute(message, args) {
        super.execute(message, args);

        try {
            let { body } = await got(
                "https://api.coindesk.com/v1/bpi/currentprice.json",
                {
                    responseType: "json",
                }
            );

            let res = JSON.parse(body);

            const {
                time: { updated: TimeUpdated },
                bpi: {
                    USD: { rate: usd },
                    EUR: { rate: eur },
                },
            } = res;

            let boticon =
                "https://bitcoin.org/img/icons/opengraph.png?1566407165";

            const bitcoinEmbed = new MessageEmbed()
                .setColor("#e3ab12")
                .setTitle("Bitcoin Prices")
                .setDescription("Current bitcoin prices:")
                .setThumbnail(boticon)
                .addField("Update time", TimeUpdated)
                .addField("USD", usd)
                .addField("EUR", eur);

            ({ body } = await got(
                "https://api.coindesk.com/v1/bpi/currentprice/TND.json",
                {
                    responseType: "json",
                }
            ));
            res = JSON.parse(body);

            const tnd = res.bpi.TND.rate;
            bitcoinEmbed.addField("TND", tnd);

            return message.channel.send(bitcoinEmbed);
        } catch (error) {
            throw new this.Errors.CustomError(
                "Error getting the bitcoin prices!",
                error.stack
            );
        }
    }
}

export default new Bitcoin();

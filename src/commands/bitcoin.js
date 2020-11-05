const { MessageEmbed } = require("discord.js");
const request = require('request');

module.exports = {
    name: 'bitcoin',
    description: 'shows the current bitcoin prices',
    execute(message, args) {

        request('https://api.coindesk.com/v1/bpi/currentprice.json', { json: true }, async function (error, response, body) {
            if (error) {
                return console.log(error);
                message.reply('Error getting the bitcoin prices!')
            }

            updated = body.time.updated;
            usd = body.bpi.USD.rate;
            eur = body.bpi.EUR.rate;

            let boticon = 'https://bitcoin.org/img/icons/opengraph.png?1566407165';
            const bitcoinEmbed = await new MessageEmbed()
                .setColor("#e3ab12")
                .setTitle("Bitcoin Prices")
                .setDescription("Current bitcoin prices:")
                .setThumbnail(boticon)
                .addField("Update time", updated)
                .addField("USD", usd)
                .addField("EUR", eur);

            request('https://api.coindesk.com/v1/bpi/currentprice/TND.json', { json: true }, async function (error, response, body) {
                if (error) {
                    return console.log(error);
                    message.reply('Error getting the bitcoin prices!')
                }

                tnd = await body.bpi.TND.rate;
                bitcoinEmbed.addField("TND", tnd);
                return message.channel.send(bitcoinEmbed);

            });
        });

    },
};

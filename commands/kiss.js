const superagent = require("snekfetch");
const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
    superagent.get('https://nekos.life/api/couple')
        .end((err, response) => {
      const embed = new Discord.MessageEmbed()
      .setTitle("Kiss gif")
      .setImage(response.body.url)
      .setColor("RANDOM")
      .setFooter(`woof`)
      .setURL(response.body.url);
  message.channel.send(embed);
    }).catch((err) => message.channel.send({embed: {
                color: 16734039,
                description: "Something went wrong... :cry:"
            }}));

}

module.exports.help = {
    name: "dog",
    description: "Sends a random dog photo",
    usage: "dog",
    type: "Fun" 
}
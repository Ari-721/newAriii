const superagent = require("snekfetch");
const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
    superagent.get('https://nekos.life/api/v2/img/meow')
        .end((err, response) => {
      const embed = new Discord.MessageEmbed()
      .setTitle("Cat gif")
      .setImage(response.body.url)
      .setColor("RANDOM")
      .setFooter(`meow`)
      .setURL(response.body.url);
  message.channel.send(embed);
    }).catch((err) => message.channel.send({embed: {
                color: 16734039,
                description: "Something went wrong... :cry:"
            }}));

}

module.exports.help = {
    name: "couple",
    description: "Sends a random couple photo",
    usage: "couple",
    type: "Fun" 
}
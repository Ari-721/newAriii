const { MessageEmbed } = require("discord.js");

module.exports = {
  info: {
    name: "ping",
    description: "ping Of The Bot",
    usage: "[ping]",
    aliases: ["ping"],
  },
  run: async function (client, message, args) {
    
    //set the permissions id here (https://discordapi.com/permissions.html)
    var permissions = 37080128;
    
    let owner = new MessageEmbed()
    .setDescription(`**Ping Pong🏓** : ** ${client.ws.ping} MS**`)
    .setColor("BLUE")
    return message.channel.send(owner);
  },
};
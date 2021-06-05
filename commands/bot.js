const { MessageEmbed } = require("discord.js");

module.exports = {
  info: {
    name: "bot",
    description: "Bot info",
    usage: "[bot]",
    aliases: ["bot"],
  },

  run: async function (client, message, args) {
    
    //set the permissions id here (https://discordapi.com/permissions.html)
    var permissions = 37080128;
    
    let bot = new MessageEmbed()
    .setTitle(`Support Server ${client.user.username}`)
    .setDescription(`
   
    
  >  Name : Ariii
  >  Servers  : ${client.guilds.cache.size}
  >  Users    : ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}
  >  Channels : ${client.channels.cache.size}
  >  Prefix   : (!!)
  >  Ping : ${client.ws.ping} MS
  >  Bot Owner : <@363268408915132418>
    
    `)
    .setURL(`https://discord.gg/v7KNdSv `)
    .setColor("BLUE")
    return message.channel.send(bot);
  },
};
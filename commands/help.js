const { MessageEmbed } = require("discord.js");

module.exports = {
  info: {
    name: "help",
    description: "The Bot Owner",
    usage: "[help]",
    aliases: ["h", "pls help" , "commands"],
  },

  run: async function (client, message, args) {
    
    //set the permissions id here (https://discordapi.com/permissions.html)
    var permissions = 37080128;
    
    let help = new MessageEmbed()
    .setTitle(`BOT LINK`)
    .setDescription(`
   **🎵 | MUSIC_COMMANDS**
   > A!pause •  A!play (A!p)  • A!skip (A!s) • 
   > ---------------------------
   > A!stop • A!leave • A!loop (A!l) 
   > ---------------------------
   > A!queue (A!q) • A!ping • A!bot (A!)
   > ---------------------------
   > A!remove • A!resume (A!r) •A!search 
   > ---------------------------
   > A!skipto (A!st) • A!volume (A!v) •A!invite (A!inv) 
   > ---------------------------
   > A!lyrics (A!ly) • A!playlist (A!pl) • A!shuffle
   > ---------------------------
    **😅 | FUN_COMMANDS**
   > A!kiss • A!slap • A!tickle
   > ---------------------------
   > A!hack • A!google • A!dog
   > ---------------------------
   > A!cat • A!boy • A!girl
   > ---------------------------
    **🎮 | GAME_COMMANDS**
   > A!8ball • A!rps • A!balls
   > ---------------------------
    **👊 | MODERATION_COMMANDS**
   > A!pin • A!unpin • A!tempmute
   > ---------------------------
    `)

    .setURL(`https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=${permissions}&scope=bot`)
    .setAuthor ("Ariii","https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
    .setColor("RED")
    return message.channel.send(help);
  },
};
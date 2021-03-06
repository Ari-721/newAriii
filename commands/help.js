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
    **PUBLIC_COMMANDS**
   > A!help • A!se • A!savatar
   > A!channelinfo • A!bot • A!invite
   > A!ping • A!listemojis • A!youtube
   > A!nick • A!rules • A!boosts
   > A!count • A!user • A!avatar
   > A!year • A!banner • A!server
   > A!guild • A!date • A!weather
   > A!invites • A!support
   > ---------------------------
   **🎵 | MUSIC_COMMANDS**
   > A!pause •  A!play (A!p)  • A!skip (A!s) 
   > A!stop • A!leave • A!loop (A!l)  
   > A!queue (A!q) • A!ping  
   > A!remove • A!resume (A!r) •A!search 
   > A!skipto (A!st) • A!volume (A!v) 
   > A!lyrics (A!ly) • A!playlist (A!pl) • A!shuffle
   > ---------------------------
    **😅 | FUN_COMMANDS**
   > A!kiss • A!slap • A!tickle
   > A!meme • A!love • A!sad
   > A!hack • A!google • A!dog
   > A!kill • A!boom 
   > A!cat • A!man • A!girl
   > ---------------------------
    **🎮 | GAME_COMMANDS**
   > A!8ball • A!rps • A!balls
   > ---------------------------
    **👊 | MODERATION_COMMANDS**
   > A!pin • A!unpin • A!tempmute
   > A!move • A!mute • A!unmute
   > A!ban • A!kick •A!unban
   > A!hide • A!unhide • A!delete
   > A!lock • A!unlock • A!bans
   > A!slowmode • A!rooms • A!clear
   > ---------------------------
   By : <@363268408915132418>
    `)

    .setURL(`https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=${permissions}&scope=bot`)
    .setAuthor ("Ariii","https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
    .setColor("RED")
    return message.channel.send(help);
  },
};
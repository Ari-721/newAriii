/////////////////////////
require("dotenv").config(); //Loading .env
const fs = require("fs");
const { Collection, Client } = require("discord.js");
const prefix = "!!";
const client = new Client(); //Making a discord bot client

var { Util } = require("discord.js");
const { Attachment } = require("discord.js");

const canvas = require("canvas");
const Canvas = require("canvas");
const convert = require("hh-mm-ss");
const botversion = require("./package.json").version;
const moment = require("moment");

const util = require("util");
const YouTube = require("simple-youtube-api");
const gif = require("gif-search");
const ms = require("ms");
const jimp = require("jimp");
const fetch = require("node-fetch");
const math = require("math-expression-evaluator");
const { get } = require("snekfetch");
const guild = require("guild");
const db = require("quick.db");
const dateFormat = require("dateformat");
var table = require("table").table;
const youtube = new YouTube("AIzaSyAdORXg7UZUo7sePv97JyoDqtQVi3Ll0b8");
const Discord = require("discord.js");
const { parse } = require("twemoji-parser");
const ytdl = require("ytdl-core");
const cmd = require("node-cmd");
const queue = new Map();
const imdb = require("imdb-api");
const cooldown = new Set();
const cdtime = 5;

client.commands = new Collection(); //Making client.commands as a Discord.js Collection
client.queue = new Map();

client.config = {
  prefix: process.env.PREFIX,
  SOUNDCLOUD: process.env.SOUNDCLOUD_CLIENT_ID
};
//////////////
fs.readdir(__dirname + "/events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(__dirname + `/events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
    console.log("Loading Event: " + eventName);
  });
});

//Loading Commands
fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, props);
    console.log("Loading Command: " + commandName);
  });
});

//Logging in to discord
client.login(process.env.TOKEN);

////////////////////
 client.on("message", async message => {
  if (message.content.startsWith(prefix + "lock")) {
    if (cooldown.has(message.author.id)) {
      return message.channel.send(`⏱ Please wait for 5 second`).then(m => {
        m.delete({ timeout: cdtime * 600 });
      });
    }

    cooldown.add(message.author.id);

    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, cdtime * 1000);
    if (!message.channel.guild)
      return message.channel.send("Sorry This Command Only For Servers.");

    if (!message.member.hasPermission("MANAGE_CHANNELS")) return;
    if (!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS"))
      return;
    message.channel.updateOverwrite(message.guild.id, {
      SEND_MESSAGES: false
    });
    const lock = new MessageEmbed()
      .setColor("RED")
      .setDescription(
        `🔒 | Locked Channel
Channel Name : <#${message.channel.id}>
Locked By : <@${message.author.id}>
Send Message : ${ghallatw}
`
      )
      .setThumbnail(message.author.avatarURL())
      .setFooter(`${message.author.tag}`, message.author.avatarURL());
    message.channel.send(lock);
  }
});
///::/://///////
const rast = "<:3626FA51DBD64815983FB2218F90BF20:812411653794430988>";
const rastw = "<:3626FA51DBD64815983FB2218F90BF20:812411653794430988>";
const ghallat = "<:CBC89BE048CF4C5AAB38F87C661962BE:812411654003621989>";
const ghallatw = "<:CBC89BE048CF4C5AAB38F87C661962BE:812411654003621989>";
const { MessageEmbed } = require("discord.js");
///////:::://////
client.on("message", async message => {
  if (message.content.startsWith(prefix + "unlock")) {
    if (cooldown.has(message.author.id)) {
      return message.channel.send(`⏱ Please wait for 5 second`).then(m => {
        
      m.delete({ timeout: cdtime * 600 });
      });
    }

    cooldown.add(message.author.id);

    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, cdtime * 1000);
    if (!message.channel.guild)
      return message.channel.send("Sorry This Command Only For Servers.");

    if (!message.member.hasPermission("MANAGE_CHANNELS")) return;
    if (!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS"))
      return;
    message.channel.updateOverwrite(message.guild.id, {
      SEND_MESSAGES: null
    });
    const unlock = new MessageEmbed()
      .setColor("RED")
      .setDescription(
        `🔓 | UnLocked Channel
Channel Name : <#${message.channel.id}>
Locked By : <@${message.author.id}>
Send Message : ${rastw}
`
      )
      .setThumbnail(message.author.avatarURL())
      .setFooter(`${message.author.tag}`, message.author.avatarURL());
    message.channel.send(unlock);
  }
});
///////////////:///////kick w ban//////
client.on("message", async message => {
  if (
    message.author.bot ||
    !message.guild ||
    !message.content.startsWith(prefix)
  )
    return;
  const args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/),
    commandName = args.shift().toLowerCase();
  if (["ban", "kick"].includes(commandName)) {
    let mode = commandName;
    if (
      !message.member.hasPermission(
        mode == "kick" ? "KICK_MEMBERS" : "BAN_MEMBERS"
      )
    )
      return message.channel.send(
        "**❌ | You don't have Permissions do to this.**"
      );
    let user = message.guild.member(
      message.mentions.users.first() ||
        message.guild.members.cache.find(x => x.id == args[0])
    );
    if (!user) return message.channel.send("**❌ | Member not found!**");
    let bot = message.guild.member(client.user);
    if (user.user.id == client.user.id) return message.channel.send("lol no");
    if (user.user.id == message.guild.owner.id)
      return message.channel.send(`**❌ | You can't ${mode} the owner!**`);
    if (
      user.roles.highest.position >= message.member.roles.highest.position &&
      message.author.id !== message.guild.ownerID
    )
      return message.channel.send(
        `**❌ | You can't ${mode} people higher ranked than yourself!**`
      );
    if (user.roles.highest.position >= bot.roles.highest.position)
      return message.channel.send(
        `**❌ | I can't ${mode} people who are higher ranked than me!**`
      );
    if (!user[`${mode == "ban" ? "bann" : mode}able`])
      return message.channel.send(
        `**❌ | Specified user is not ${mode}able.**`
      );
    user[mode](
      mode == "ban"
        ? { days: 7, reason: `Banned by ${message.author.tag}` }
        : `Kicked by ${message.author.tag}`
    )
      .then(() =>
        message.channel.send(
          `**✅ ${mode == "ban" ? "Bann" : mode}ed __${
            user.user.tag
          }__ (ID: \`${user.user.id}\`)**`
        )
      )
      .catch(console.error);
  }
});
/////////////////move////////////
client.on("message", message => {
  if (message.content.startsWith(prefix + "move")) {
    let args = message.content.split(" ");
    let user = message.guild.member(
      message.mentions.users.first() || message.guild.members.cache.get(args[1])
    );
    if (!message.channel.guild || message.author.bot) return;
    if (!message.guild.member(message.author).hasPermission("MOVE_MEMBERS"))
      return message.channel.send("Please Check Your Permission");
    if (!message.guild.member(client.user).hasPermission("MOVE_MEMBERS"))
      return message.channel.send("Please Check My Permission");
    if (!message.member.voice.channel)
      return message.channel.send("Your are not in voice channel");
    if (!user) return message.channel.send(`**>>> ${prefix}move <@mention or id>`);
    if (!message.guild.member(user.id).voice.channel)
      return message.channel.send(
        `**${user.user.username}** Has not in Voice channel`
      );
    message.guild
      .member(user.id)
      .voice.setChannel(message.member.voice.channel.id)
      .then(() => {
        message.channel.send(
          `**${user.user.username}** has been moved to **${
            message.guild.member(message.author).voice.channel.name
          }**`
        );
      });
  }
  if (message.content.toLowerCase() === prefix + "help move") {
    let move = new Discord.MessageEmbed()
      .setTitle(`Command: move`)
      .addField("Usage", `${prefix}move @user`)
      .addField("Information", "move members");
    message.channel.send(move);
  }
});
//::::://////////////movevoice/////
client.on('message', message => { //Black jack
    if (!message.channel.guild) return;
if(message.content == prefix + 'boosts') //Black jack
var Black = new Discord.MessageEmbed()
.setThumbnail(message.author.avatarURL())
.setFooter(message.author.username, message.author.avatarURL())
.addField('Server Name',`${message.guild.name}`)

.addField('Boost Count',` ${message.guild.premiumSubscriptionCount}`)
.setColor("RANDOM")
message.channel.send(Black);
}); 
/////////count///////
client.on('message', message => { //Black jack
    if (!message.channel.guild) return;

if(message.content == prefix + 'count') //Black jack
var Black = new Discord.MessageEmbed()
.setThumbnail(message.author.avatarURL())
.setFooter(message.author.username, message.author.avatarURL())
.setTitle('Info server ',`__${message.guild.name}__`)
.addField('Total Member',`__${message.guild.memberCount}__`)
message.channel.send(Black);
}); 
///////////////////rules////
client.on("message", message => {
    if (message.content.startsWith(prefix + "rules")) {
      if (!message.member.hasPermission("MANAGE_GUILD")) return;
     const blackjack = new Discord.MessageEmbed() 
         .setColor("BLACK")
         .setTitle("RULES")
         .setImage("https://media.discordapp.net/attachments/644265220449107968/646324616536784897/image0-16.png")
         .setFooter("RULES")
         .setDescription(`
**__Rules|یاسا__**
 
سەرتا سلاو تان لێبێ 
ئێمە وەک هەریەک لە سێرڤەرەکانی کە یاسای تایبەت بە خۆمان هەیە 
1. نابێت قسەی ناشیاو یان جنێوێکێک بدەی چونکە یەکسەر باندت ئەکەین
2. نابێت لە ڤۆیسی گشتی بۆت بەکاربێنن
3. ریکلام کردن بە هەموو شێوەک قەدەخەیە جگە لە گۆرینەوەی
4. نابێت بە هیچ شێوەیەک بێرێزی بە تاکێکی ستافەکە بکەیت
5. بێزارکردنی پلەیەر و میوان قەدەخەیە
6. باسکرنی سیاسەت بە هەموو شێوەیەک قەدەخەیە
7. شارچێتی قەدەخەیە
8. سوکایەتی کردن بە یەک قەدەخەیەو یەکسەر باندە
9. زۆر دووبارە کردنەوەی مەسج یاجود سپام کردن قەدەخەیە
لەگەل رێزماندا....!
   `)
   message.channel.send(blackjack)
 
   }
   });
//////////////////nick//////
client.on("message", message => {
  if(message.content.startsWith(prefix + "nick")){
      if (!message.member.hasPermission("MANAGE_NICKNAMES")) return message.reply("**You Dont hAve Premission MANAGE NICKNAMES**")
  var user = message.mentions.members.first();
  var args = message.content.split(" ").slice(2);
  var nick = args.join(" ");
  if(!user || !args) return message.channel.send(`**${prefix}nick @tag NickName**`);
  message.guild.member(user.user).setNickname(`${nick}`);
  const blackj = new Discord.MessageEmbed()
  .setAuthor(message.author.username,message.author.avatarURL())
  .setThumbnail(message.author.avatarURL())
  .setTitle("**Done The Changed NickName**")
  .addField("Name User", user)
  .addField("Nickname New", nick)
  .addField("Moderation", message.author.tag)
  .setColor("RANDOM")
  message.channel.send(blackj)
  }
  });
///////////avatar/////
client.on("message", message => {
  if (message.content.startsWith(prefix + "avatar")) {
    if (!message.channel.guild) return;
    var mentionned = message.mentions.users.first();
    var client;
    if (mentionned) {
      var client = mentionned;
    } else {
      var client = message.author;
    }
    const embed = new Discord.MessageEmbed()
      .addField("Requested by:", "<@" + message.author.id + ">")
      .setColor("BLACK")
      .setImage(`${client.avatarURL}`)
      .setFooter("BLACK BOT");
    message.channel.send(embed);
  }
});
////////////user///////////
client.on("message", message => {
  if (message.content.startsWith(prefix + "user")) {
    if (!message.channel.guild) return;
    let user = message.mentions.users.first();
    var men = message.mentions.users.first();
    var heg;
    if (men) {
      heg = men;
    } else {
      heg = message.author;
    }
    var mentionned = message.mentions.members.first();
    var h;
    if (mentionned) {
      h = mentionned;
    } else {
      h = message.member;
    }
    const embed = new Discord.MessageEmbed()
        .setThumbnail(heg.avatarURL())
        .addField("**ID**", `${heg.id}`, true)
        .addField("**Name**", `${heg.username}`, true)
        .addField('**Discrim Account**',"**#" +  `${heg.discriminator}**`,true)
        .addField("**Created Account At**", `${heg.createdAt}`, true)
        .addField("**Time Join Server**", message.member.joinedAt.toLocaleString())    
        .addField("**Bot**", `${heg.bot}`, true)
        .setFooter(`Replying to ${message.author.username}#${message.author.discriminator}`)
        .setColor("RANDOM")     
        .setFooter("BLACK SESTAM");
  
    message.channel.send(embed);
  }
});
//////////year///////
client.on("message", msg => {
if (msg.content.startsWith(prefix + "year")){
    let now = new Date();
    let next = new Date(now);
    next.setFullYear(now.getFullYear() + 1);
    next.setHours(0, 0, 0, 0);
    next.setMonth(0, 1);
    let duration = next - now;
    let seconds = Math.floor((duration / 1000) % 60);
    let minutes = Math.floor((duration / 1000 / 60) % 60);
    let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    let days = Math.floor(duration / (1000 * 60 * 60 * 24));
    
    let embed = new Discord.MessageEmbed()
    .setAuthor("Next Year!", msg.author.displayAvatarURL())
    .setColor("RANDOM")
    .setDescription(`There are **${days} days**, **${hours} hours**, **${minutes} minutes** and **${seconds} seconds** until **${next.getFullYear()}**!`)
    .setImage("")
    .setFooter(`Or, in short, ${moment.duration(next - now).humanize()}.`)
    msg.channel.send(embed)
}
})
///////////////banner/////////
client.on("message", message => {
  if(message.content.startsWith(prefix + "banner")) {
    if(message.guild.bannerURL() === null || message.guild.bannerURL === undefined) return message.channel.send("**❌ | This server doesn\'t have a banner.**");
    const ba = new Discord.MessageEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL())
    .setDescription(`[Banner URL](${message.guild.bannerURL}?size=2048)`)
    .setImage(message.guild.bannerURL() + "?size=2048")
    message.channel.send({embed : ba})
  }
});
/////////////:::://///kill//////
client.on("message", message => {
  if (!message.content.startsWith(prefix)) return;
  if (!message.channel.guild)
    return 
  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);
  if (command === "kill") {
    var sabotage = message.mentions.users.first();
    if (sabotage == message.author)
      return message.reply(`**No please menition user**`);
    if (sabotage === client.user) return message.reply(`**Why?**`);
    if (sabotage < 1) {
      message.delete();
      return message.channel.sendMessage(
        "Put something to kill like mention your username or use an emoji"
      );
    }
    if (!sabotage)
      return message.channel.send(`Please Mention A Member to Kill :warning:`);
    message.channel.send("▄︻̷̿┻̿═━一 ${sabotage").then(msg => {
      msg.edit(`▄︻̷̿┻̿═━一 ${sabotage} :three:`);
      setTimeout(function() {
        msg.edit(`▄︻̷̿┻̿═━一 ${sabotage} :two:`);
      }, 1000);
      setTimeout(function() {
        msg.edit(`▄︻̷̿┻̿═━一 ${sabotage} :one:`);
      }, 2000);
      setTimeout(function() {
        msg.edit(`▄︻̷̿┻̿═━一 :boom:`);
      }, 3000);
      setTimeout(function() {
        msg.edit(`▄︻̷̿┻̿═━一 :fire:`);
      }, 4000);
      setTimeout(function() {
        msg.edit(`▄︻̷̿┻̿═━一 :skull:`);
      }, 5000);
      msg.delete(6000);
      message.delete();
    });
    message.channel
      .send("**** The crime has been successfully hidden 🕳 **")
      .then(msg => msg.delete(7000));
  }
});
//////////////////youtube :///////////0
client.on("message", message => {
  if (message.content.startsWith(prefix + "youtube")) {
    const query = message.content.split(" ").slice(1);
    const url = `https://www.youtube.com/results?search_query=${query}`;
    if (!query)
      return message.channel.send(
        `**:x: | Error , Please Type Command True Ex : \`${prefix}youtube [Anything]\`**`
      );
    let querry = new Discord.MessageEmbed()
      .setAuthor(
        "Youtube",
        "https://cdn.discordapp.com/attachments/599152027628732429/599229170517540874/1GNwojhBBCCCGEEEIIIYQQQgghhBBCCCGEEELI7APi4BZVCOUmf4AAAAASUVORK5CYII.png"
      )
      .setColor("RED")
      .setTitle(`Results : \`${query.join(" ")}\``)
      .setDescription(`${url}`)
      .setFooter(message.author.username, message.author.avatarURL());
    message.channel.send(querry);
  }
});
/////////////server////////
client.on("message", msg => {
  if (msg.content == prefix + "server") {
    let embed = new Discord.MessageEmbed()
      .setThumbnail(msg.guild.iconURL())
      .setColor("RANDOM")
      .addField("Year📆", msg.guild.createdAt.getFullYear())
      .addField("Hour📆", msg.guild.createdAt.getHours())
      .addField("Day📆", msg.guild.createdAt.getDay())
      .addField("Month📆", msg.guild.createdAt.getMonth())
      .addField("Minutes📆", msg.guild.createdAt.getMinutes())
      .addField("Seconds📆", msg.guild.createdAt.getSeconds())
      .addField("Full📆", msg.guild.createdAt.toLocaleString())
      .setTimestamp();
    msg.channel.send(embed);
  }
});
////////////date/////
client.on('message', message => {
         if (message.content === prefix + "date") {
         if (!message.channel.guild) return   
         var currentTime = new Date(),
            hours = currentTime.getHours() + 4 ,
            hours2 = currentTime.getHours() + 3 ,
            hours3 = currentTime.getHours() + 2 ,
            hours4 = currentTime.getHours() + 3 ,
            minutes = currentTime.getMinutes(),
            seconds = currentTime.getSeconds(),
            Year = currentTime.getFullYear(),
            Month = currentTime.getMonth() + 1,
            Day = currentTime.getDate();
             var h = hours
  if(hours > 12) {
               hours -= 12;
            } else if(hours == 0) {
                hours = "12";
            }  
             if(hours2 > 12) {
               hours2 -= 12;
            } else if(hours2 == 0) {
                hours2 = "12";
            
            }  
                         if(hours3 > 12) {
               hours3 -= 12;
            } else if(hours3 == 0) {
                hours3 = "12";
            } 
            if (minutes < 10) {
                minutes = '0' + minutes;
            }
            var suffix = 'AM';
            if (hours >= 12) {
                suffix = 'PM';
                hours = hours - 12;
            }
            if (hours == 0) {
                hours = 12;
            }
 

                var Date15= new Discord.MessageEmbed()
                .setThumbnail("https://i.imgur.com/ib3n4Hq.png") 
                .setTitle( "TIME AND DATE")
                .setColor('RANDOM')
                .setFooter("BLACK BOT")
                .setFooter(message.author.username, message.author.avatarURL())
                 .addField('Time',
                "『"+ hours2 + ":" + minutes +":"+ seconds  + "』") 
              
                .addField('Date',
                "『"+ Day + "-" + Month + "-" + Year +  "』")

                 message.channel.send(Date15);
        }
    });
//////////////rooms///////////
client.on("message", message => {
  if (message.content.startsWith(prefix + "rooms")) {
    if (message.author.bot) return;
    if (!message.guild) return;

    var channels = message.guild.channels.cache
      .map(channels => `${channels.name}, `)
      .join(" ");
    const embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(message.author.username, message.author.avatarURL())
      .setTitle("**INFO ROOMS**")
      .addField(`${message.guild.name}`, `**Rooms:white_check_mark:**`)
      .addField(
        ":arrow_down: Rooms Number. :heavy_check_mark:",
        `** ${message.guild.channels.cache.size}**`
      )

      .addField(
        ":arrow_down:Rooms  Name. :heavy_check_mark::",
        `**[${channels}]**`
      );
    message.channel.send(embed);
  }
});
//////////////////weather.js/////////
const weather = require("weather-js");
client.on("message", message => {
  if (message.content.startsWith(prefix + "weather")) {
    var args = message.content.split(" ").slice(1);
    weather.find({ search: args.join(" "), degreeType: "C" }, function(
      err,
      result
    ) {
      if (err) message.channel.send(err);
      if (result === undefined || result.length === 0) {
        message.channel.send("**Please enter a location!**");
        return;
      }
      var current = result[0].current;
      var location = result[0].location;
      const embed = new Discord.MessageEmbed()
        .setDescription(`**${current.skytext}**`)
        .setAuthor(`Weather for ${current.observationpoint}`)
        .setThumbnail(current.imageUrl)
        .setColor(0x00ae86)
        .addField("Timezone", `UTC${location.timezone}`, true)
        .addField("Degree Type", location.degreetype, true)
        .addField("Temperature", `${current.temperature} Degrees`, true)
        .addField("Feels Like", `${current.feelslike} Degrees`, true)
        .addField("Winds", current.winddisplay, true)
        .addField("Humidity", `${current.humidity}%`, true);
      message.channel.send({ embed });
    });
  }
});
////////////////hide //
client.on("message", message => {
  if (message.content === prefix + "close") {
    if (!message.channel.guild) return;
    if (!message.member.hasPermission("MANAGE_CHANNELS"))
      return message.reply("You Dont Have Perms `MANAGE CHANNELS` :x:");
    message.channel.createOverwrite(message.guild.id, {
      VIEW_CHANNEL: false
    });
    const embed = new Discord.MessageEmbed()
      .setThumbnail(message.author.avatarURL())
      .setTitle("**Channel hided**")
      .addField("Guild name", message.guild.name)
      .addField("Channel", message.channel.name)
      .addField("Moderation", `<@${message.author.id}>`, true)
      .setColor("RANDOM");
    message.channel.send(embed).then(bj => {
      bj.react("🔒");
    });
  }
});
//////////unhide//////

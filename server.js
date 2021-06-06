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
  if (msg.content == prefix + "guild") {
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
  if (message.content === prefix + "hide") {
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
client.on("message", message => {
  if (message.content === prefix + "unhide") {
    if (!message.channel.guild) return;
    if (!message.member.hasPermission("MANAGE_CHANNELS"))
      return message.reply("You dont have Perms `MANAGE CHANNELS`:x:");
    message.channel.createOverwrite(message.guild.id, {
      VIEW_CHANNEL: true
    });
    const embed = new Discord.MessageEmbed()
      .setThumbnail(message.author.avatarURL())
      .setTitle("**Channel unhided**")
      .addField("Guild name", message.guild.name)
      .addField("Channel", message.channel.name)
      .addField("Moderation", `<@${message.author.id}>`, true)
      .setColor("RANDOM");
    message.channel.send(embed).then(bj => {
      bj.react("🔓");
    });
  }
});
/////////////delete///////
client.on("message", message => {
  if (message.content.startsWith(prefix + "delete")) {
    if (!message.member.hasPermission("MANAGE_CHANNELS"))
      return message.reply("You Don't Have `MANAGE_CHANNELS` Premissions ");
    let args = message.content.split(" ").slice(1);
    let channel = message.mentions.channels.first();
    if (!channel)
      return message
        .reply("**There is not Found room Please mention channel**")
        .catch(console.error);
    channel.delete();
    message.author.send("**Done check✅**");
  }
});
////////////meme////////
client.on("message", message => {
  if (message.content.startsWith(prefix + "meme")) {
    let meme = [
      "https://media.discordapp.net/attachments/778349612146360381/805361657781944340/FB_IMG_1608729181806.jpg",
      "https://media.discordapp.net/attachments/778349612146360381/805361657177702420/IMG_20201125_181212.jpg",
      "https://media.discordapp.net/attachments/778349612146360381/805361656954748948/received_310923683551106.jpeg",
      "https://media.discordapp.net/attachments/778349612146360381/805361656698765342/Komede.jpg",
      "https://media.discordapp.net/attachments/778349612146360381/805361172776747038/1f16fa85f750c462.jpg",
      "https://media.discordapp.net/attachments/778349612146360381/805361042229690398/image0.jpg",
      "https://media.discordapp.net/attachments/791219055083651092/805361152481689610/image0.jpg",
      "https://media.tenor.co/videos/2f17757958ab63c82e105cb2f068ba25/mp4",
      "https://media.discordapp.net/attachments/793750057500278805/805371117404815360/image0.jpg",
      "https://media.discordapp.net/attachments/793750057500278805/805370861393149962/image0.jpg",
      "https://media.discordapp.net/attachments/793750057500278805/805370485155954728/image0.jpg",
      "https://media.discordapp.net/attachments/791219055083651092/805363347390201866/image0.jpg",
      "https://media.discordapp.net/attachments/791219055083651092/805363470182383646/image0.jpg",
      "https://media.discordapp.net/attachments/791219055083651092/805363578055163934/image0.jpg",
      "https://media.discordapp.net/attachments/788957374311956480/792776202984095744/133411745_960371687826475_946663856063250772_n.png",
      "https://media.discordapp.net/attachments/768041476004904971/781669774374469642/124907941_1816050908534119_3407893796902602469_n.jpg",
      "https://media.discordapp.net/attachments/768041476004904971/777584124663037982/Will_You_Shut_Up_Man_.jpg",
      "https://media.discordapp.net/attachments/768041476004904971/777176870130155540/Screenshot_2020-11-14-18-17-30.png",
      "https://media.discordapp.net/attachments/791219055083651092/805364265540124683/image0.jpg",
      "https://media.discordapp.net/attachments/778349612146360381/805361657387024414/Screenshot_20210122_160111.jpg",
      "https://media.discordapp.net/attachments/793750057500278805/805781587316441108/image0.jpg",
      "https://media.discordapp.net/attachments/793750057500278805/805781864220196885/image0.jpg",
      "https://media.discordapp.net/attachments/793750057500278805/805782023562199060/image0.jpg",
      "https://media.discordapp.net/attachments/793750057500278805/806561503980421120/image0.jpg"
    ];

    message.channel
      .send({
        embed: {
          description: `**${message.author.username} Meme photos :joy:**`,
          image: {
            url: meme[Math.floor(Math.random() * meme.length)]
          }
        }
      })
      .catch(e => {
        client.log.error(e);
      });
  }
});
/////////////boom/////
client.on("message", message => {
  if (message.content.startsWith(prefix + "boom")) {
    let bombs = [
      
      "https://media.giphy.com/media/Xp98Vi5OBvhXpwA0Zp/giphy.gif",
      "https://media.giphy.com/media/POnwee2RZBWmWWCeiX/giphy.gif",
      "https://media.giphy.com/media/oywQ7OhnYupINQa0L4/giphy.gif",
      "https://media.giphy.com/media/5aLrlDiJPMPFS/giphy.gif",
      "https://media.giphy.com/media/l1BgS9aNtdCdjgkaQ/giphy.gif",
      "https://media.giphy.com/media/d0NnEG1WnnXqg/giphy.gif",
      "https://media.giphy.com/media/NmrqUdwGXPOog/giphy.gif",
      "https://media.giphy.com/media/dpnfPvaCIHBrW/giphy.gif",
      "https://media.giphy.com/media/mks5DcSGjhQ1a/giphy.gif",
      "https://media.giphy.com/media/8wfoaIjVc0FBaLu5xH/giphy.gif",
      "https://media.giphy.com/media/xThtanBNixj1O1m5oY/giphy.gif",
      "https://media.giphy.com/media/fdGkCOiM0oOqI/giphy.gif",
      "https://media.giphy.com/media/c862b2dAhJXYA/giphy.gif",
      "https://media.giphy.com/media/CepTYjGRbV1ba/giphy.gif",
      "https://media.giphy.com/media/sRGCQ7INgSD0qbTqB5/giphy.gif",
      "https://media.giphy.com/media/ZJYOwl8SbFsic/giphy.gif",
      "https://media.giphy.com/media/3oEhmKspQX9EN48HNm/giphy.gif",
      "https://media.giphy.com/media/l1KVcAP6jvP9r4MaA/giphy.gif",
      "https://media.giphy.com/media/j2mY6orBJqAdG/giphy.gif",
      "https://media.giphy.com/media/3oz8xEqn8AGAQbR0yY/giphy.gif",
      "https://media.giphy.com/media/l4lQW9KfRQscU0ds4/giphy.gif",
      "https://media.giphy.com/media/XathaB5ILqSME/giphy.gif",
      "https://media.giphy.com/media/26AHvF2p5pridaSf6/giphy.gif",
      "https://media.giphy.com/media/Nlur5uO8GkjC0/giphy.gif",
      "https://media.giphy.com/media/l1J3preURPiwjRPvG/giphy.gif",
      "https://media.giphy.com/media/8cdZit2ZcjTri/giphy.gif",
      "https://media.giphy.com/media/3o7btNa0RUYa5E7iiQ/giphy.gif",
      "https://media.giphy.com/media/V88pTEefkoOFG/giphy.gif",
      "https://media.giphy.com/media/rfWAomOTPeOo8/giphy.gif"
    ];

    message.channel
      .send({
        embed: {
          description: `${message.author.username} BOOMED`,
          image: {
            url: bombs[Math.floor(Math.random() * bombs.length)]
          }
        }
      })
      .catch(e => {
        client.log.error(e);
      });
  }
});
///////////////man//////
client.on("message", message => {
  if (message.content.startsWith(prefix + "man")) {
    let man = [
      "https://media.discordapp.net/attachments/786897044483604490/803870769313480714/Enes_Acar_GIF_70.gif",
      "https://media.discordapp.net/attachments/786897044483604490/803870793716858880/a_57a7f6c875e3a329b170edf177392911.gif",
      "https://media.discordapp.net/attachments/786897044483604490/803870817351368734/5-2.gif",
      "https://media.discordapp.net/attachments/786897044483604490/804007829010513966/image1.gif",
      "https://media.discordapp.net/attachments/786897044483604490/804007829483552838/image3.gif",
      "https://media.discordapp.net/attachments/786897044483604490/804219672513478706/Lenora_36.gif",
      "https://media.discordapp.net/attachments/786897044483604490/804220384899498064/Lenora_28.gif",
      "https://media.discordapp.net/attachments/786897044483604490/804220394697392158/Lenora_33.gif",
      "https://media.discordapp.net/attachments/786897044483604490/804315371271749662/image0-20.gif",
      "https://media.discordapp.net/attachments/786897044483604490/804968359572930580/ALANIS_MAN_GIF_156.gif",
      "https://media.discordapp.net/attachments/786897044483604490/804968381816111124/image0-5.gif",
      "https://media.discordapp.net/attachments/786897044483604490/804760463044640808/ALANIS_MAN_GIF_99.gif",
      "https://media.discordapp.net/attachments/786897044483604490/803870704999202836/ENES_ACAR_GIF_104.gif",
      "https://media.discordapp.net/attachments/786897044483604490/803870737941135421/ENES_ACAR_GIF_15.gif",
      "https://media.discordapp.net/attachments/821688367564587058/825100708427726878/image0.gif",
      "https://media.discordapp.net/attachments/786897044483604490/803870682479067166/ENES_ACAR_GIF_135.gif",
      "https://media.discordapp.net/attachments/821688367564587058/825100708755537920/image1.gif",
      "https://media.discordapp.net/attachments/821688367564587058/825100709107073024/image2.gif",
      "https://media.discordapp.net/attachments/821688367564587058/825100709519294494/image3.gif",
      "https://media.discordapp.net/attachments/821688367564587058/825100709849858048/image4.gif",
      "https://media.discordapp.net/attachments/821688367564587058/825100710243729489/image5.gif",
      "https://media.discordapp.net/attachments/821688367564587058/825100710520815626/image6.gif",
      "https://media.discordapp.net/attachments/821688367564587058/825100710797770822/image7.gif",
      
    ];

    message.channel
      .send({
        embed: {
          description: `${message.author.username} MAN GIFS photos  `,
          image: {
            url: man[Math.floor(Math.random() * man.length)]
          }
        }
      })
      .catch(e => {
        client.log.error(e);
      });
  }
});
///////////////girl://////
client.on("message", message => {
  if (message.content.startsWith(prefix + "girl")) {
    let girl = [
      "https://media.discordapp.net/attachments/786897045436366849/804968189892755456/image2-1.gif",
      "https://media.discordapp.net/attachments/786897045436366849/804968223577604126/gif472.gif",
      "https://media.discordapp.net/attachments/786897045436366849/804968231794245642/rexsin_212.gif",
      "https://media.discordapp.net/attachments/786897045436366849/804968258859827210/pintrst___luri_4.gif",
      "https://media.discordapp.net/attachments/786897045436366849/804983128527077387/a_177ddfe86ad32b68be6200f007682136.gif",
      "https://media.discordapp.net/attachments/786897045436366849/805008600334073866/3WIu.gif",
      "https://media.discordapp.net/attachments/786897045436366849/805370008330436648/image0.gif",
      "https://media.discordapp.net/attachments/786897045436366849/805008566439641128/image0.gif",
      "https://media.discordapp.net/attachments/786897045436366849/804681217022099466/a_3c85d4517fbaf4f750d344820b49c076.gif",
      "https://media.discordapp.net/attachments/786897045436366849/804682936615829504/image0.gif",
      "https://media.discordapp.net/attachments/786897045436366849/804314115601596426/ALANIS_WOMAN_GIF_176.gif",
      "https://media.discordapp.net/attachments/786897045436366849/804280612227383316/ALANIS_WOMAN_GIF_138.gif",
      "https://media.discordapp.net/attachments/821688338305908756/824147075184197642/image0.gif",
      "https://media.discordapp.net/attachments/821688338305908756/824147075687645184/image1.gif",
      "https://media.discordapp.net/attachments/821688338305908756/824147124378796032/image0.gif",
      "https://media.discordapp.net/attachments/821688338305908756/824147124614201374/image1.gif",
      "https://media.discordapp.net/attachments/821688338305908756/824147125045559296/image2.gif",
      "https://media.discordapp.net/attachments/821688338305908756/824147125327626240/image3.gif",
      "https://media.discordapp.net/attachments/821688338305908756/824147125653864458/image4.gif",
      "https://media.discordapp.net/attachments/821688338305908756/824147125901590538/image5.gif",
      "https://media.discordapp.net/attachments/821688338305908756/824147126166487070/image6.gif",
      "https://media.discordapp.net/attachments/821688338305908756/824147126568615956/image7.gif",
      "https://media.discordapp.net/attachments/821688338305908756/824147148715196427/image2.gif",
      "https://media.discordapp.net/attachments/821688338305908756/824147149243023370/image3.gif",
      "https://media.discordapp.net/attachments/821688338305908756/824147151252357160/image6.gif",
      "https://media.discordapp.net/attachments/821688338305908756/824147151525118012/image7.gif",
      "https://media.discordapp.net/attachments/821688338305908756/824147151843360768/image8.gif",
      "https://media.discordapp.net/attachments/821688338305908756/824147152090562570/image9.gif",
      "https://media.discordapp.net/attachments/821688338305908756/824147158851649556/image1.gif",
      "https://media.discordapp.net/attachments/821688338305908756/824147159112744990/image2.gif",
      "https://media.discordapp.net/attachments/821688338305908756/824147159338713118/image3.gif",
      "https://media.discordapp.net/attachments/821688338305908756/824147159611473960/image4.gif",
      "https://media.discordapp.net/attachments/821688338305908756/824147160005083156/image5.gif",
      "https://media.discordapp.net/attachments/821688338305908756/824147160299601980/image6.gif",
      "https://media.discordapp.net/attachments/821688338305908756/824147160625971200/image7.gif",
      "https://media.discordapp.net/attachments/821688338305908756/824147161167298560/image8.gif",
      "https://media.discordapp.net/attachments/821688338305908756/824147161422757908/image9.gif",
    ];

    message.channel
      .send({
        embed: {
          description: `${message.author.username} GIRL GIFS `,
          image: {
            url: girl[Math.floor(Math.random() * girl.length)]
          }
        }
      })
      .catch(e => {
        client.log.error(e);
      });
  }
});
///////////2/2///sad
client.on("message", message => {
  if (message.content.startsWith(prefix + "sad")) {
    let sads = [
      "https://media.discordapp.net/attachments/786897045952790550/798719676795715614/Zeyrox_43.gif",
      "https://media.discordapp.net/attachments/786897045952790550/799435191323852820/luisa1-1.gif",
      "https://media.discordapp.net/attachments/786897045952790550/799435254011920404/a_caf4fdc4f3e516fcabec0022078c38ab.gif",
      "https://media.discordapp.net/attachments/786897045952790550/804040753072439326/038842117446a0c76a922d23727942b1.gif",
      "https://media.discordapp.net/attachments/786897045952790550/787581071079768074/image0.gif",
      "https://media.discordapp.net/attachments/786897045952790550/787581004424544256/image0.gif",
      "https://media.discordapp.net/attachments/786897045952790550/787580974975549450/image0.gif",
      "https://media.discordapp.net/attachments/786897045952790550/787580943627976704/image0.gif",
      "https://media.discordapp.net/attachments/786897045952790550/802930927784820766/Cedric_Anime_Gif_81.gif",
      "https://media.discordapp.net/attachments/786897045952790550/802722301984243712/a_66f26e072e89a58c1879c6fa27744bd7.gif",
      "https://media.discordapp.net/attachments/786897045952790550/801054305569865778/uzgun-4.gif",
      "https://media.discordapp.net/attachments/786897044483604490/806288916160315422/image0.gif"
    ];

    message.channel
      .send({
        embed: {
          description: `${message.author.username} **SAD GIFS**`,
          image: {
            url: sads[Math.floor(Math.random() * sads.length)]
          }
        }
      })
      .catch(e => {
        client.log.error(e);
      });
  }
});
//////////love//////
client.on("message", message => {
  if (message.content.startsWith(prefix + "love")) {
    let loves = [
      "https://media.discordapp.net/attachments/608711480346542102/782233713538498600/hit_gif_5.gif",
      "https://media.discordapp.net/attachments/608711480346542102/782286421020508170/image0_1.gif",
      "https://media.discordapp.net/attachments/608711480346542102/782284851570147358/image0-1-4.gif",
      "https://media.discordapp.net/attachments/608711480346542102/782406047473467422/image0.gif",
      "https://media.discordapp.net/attachments/608711480346542102/782148760997593098/a_8bc52b6080ce3079988c6e49f84c4b03.gif",
      "https://media.discordapp.net/attachments/608711480346542102/782445443665625128/ezgif-7-2032ed99845d.gif",
      "https://media.discordapp.net/attachments/608711480346542102/782196955488321556/a_637b8e2042d540a1e5e28282e3fe5cc7.gif",
      "https://media.discordapp.net/attachments/788119246517174362/803307812608409600/image0.gif",
      "https://media.discordapp.net/attachments/788119246517174362/803869330005688340/a_130ce69bc8c1f06d917ee668f7051b64.gif",
      "https://media.discordapp.net/attachments/788119246517174362/803869344266321931/dans4.gif",
      "https://media.discordapp.net/attachments/788119246517174362/803869587988152340/gif.13.gif",
      "https://media.discordapp.net/attachments/788119246517174362/803869653641854996/20210105_223539.gif",
      "https://media.discordapp.net/attachments/788119246517174362/803869660814376960/a_09fbaba0301c6db194af2f0c6d2a6a93.gif",
      "https://media.discordapp.net/attachments/788119246517174362/804188805204410378/2.gif",
      "https://media.discordapp.net/attachments/788119246517174362/804337804179275776/16-10-27-tenor.gif",
      "https://media.discordapp.net/attachments/788119246517174362/804759240451424256/Lrows_Gif_25.gif",
      "https://media.discordapp.net/attachments/788119246517174362/804759252899594259/ciftler8.gif"
    ];

    message.channel
      .send({
        embed: {
          description: `${message.author.username} :heart:  Love photos  `,
          image: {
            url: loves[Math.floor(Math.random() * loves.length)]
          }
        }
      })
      .catch(e => {
        client.log.error(e);
      });
  }
});
////////////invites
client.on("message", message => {
  if (message.content.startsWith(prefix + "invites")) {
    if (cooldown.has(message.author.id)) {
      return message.channel
        .send(`:stopwatch: | Please wait for 10 second`)
        .then(m => {
          m.delete({ timeout: cdtime * 600 });
        });
    }

    cooldown.add(message.author.id);

    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, cdtime * 1000);
    message.guild.fetchInvites().then(invs => {
      let user = message.mentions.users.first() || message.author;
      let personalInvites = invs.filter(i => i.inviter.id === user.id);
      let inviteCount = personalInvites.reduce((p, v) => v.uses + p, 0);
      message.channel.send(`${user} has ${inviteCount} invites.`);
    });
  }
});
/////////////clear 
client.on("message", message => {
  if (!message.guild) return;
  if (message.author.bot) return;
  let args = message.content.split(" ");
  let command = args[0].toLowerCase();
  if (command === prefix + "clear") {
    if (cooldown.has(message.author.id)) {
      return message.channel
        .send(`:stopwatch: | Please wait for 10 second`)
        .then(m => {
          m.delete({ timeout: cdtime * 600 });
        });
    }

    cooldown.add(message.author.id);

    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, cdtime * 1000);
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(
        `❌ You are missing the permission \`MANAGE MESSAGES\`.`
      );
    if (!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(
        `❌ I Am missing the permission \`MANAGE MESSAGES\`.`
      );
    if (!args[1]) {
      message.channel
        .bulkDelete(100)
        .then(m =>
          message.channel
            .send(`\`\`\`\nDeleted ${m.size} messages\n\`\`\``)
            .then(p => p.delete({ timeout: 3000 }))
        );
    } else {
      message.delete().then(n => {
        message.channel
          .bulkDelete(args[1])
          .then(m =>
            message.channel
              .send(`\`\`\`\nDeleted ${m.size} messages\n\`\`\``)
              .then(p => p.delete({ timeout: 3000 }))
          );
      });
    }
  }
});
///////////unmute
client.on("message", async message => {
  let args = message.content.split(" ");
  let user = message.mentions.users.first();
  if (message.content.startsWith(prefix + "unmute")) {
    if (cooldown.has(message.author.id)) {
      return message.channel
        .send(`:stopwatch: | Please wait for 10 second`)
        .then(m => {
          m.delete({ timeout: cdtime * 600 });
        });
    }

    cooldown.add(message.author.id);

    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, cdtime * 1000);
    if (!message.guild.member(message.author).hasPermission("MUTE_MEMBERS"))
      return message.channel.send(
        "**Please Check Your Permission MUTE_MEBMERS**"
      );
    if (!message.guild.member(client.user).hasPermission("MUTE_MEMBERS"))
      return message.channel.send(
        "**Please Check My Permission MUTE_MEBMERS**"
      );
    if (!user)
      return message.channel.send(`**>>> ${prefix}unmute <@mention Or ID>**`);
    let mute = message.guild.roles.cache.find(
      role => role.name === "Muted",
      "Muted By BlackSestam"
    );
    message.guild.channels.cache.forEach(async channel => {
      await channel.createOverwrite(mute, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false
      });
    });
    message.guild.member(user).roles.remove(mute);
    message.channel.send(`**removed mute from ${user.username}!**`);
  }
  if (message.content.toLowerCase() === `${prefix}help unmute`) {
    let unmute = new Discord.MessageEmbed()
      .setTitle(`Command: unmute `)
      .addField("Usage", `${prefix}unmute @user`)
      .addField("Information", "unmute Members");
    message.channel.send(unmute);
  }
});
////////////mute///
client.on("message", async message => {
  let args = message.content.split(" ");
  let user =
    message.mentions.users.first() || message.guild.members.cache.get(args[1]);
  if (message.content.startsWith(prefix + "mute")) {
    if (cooldown.has(message.author.id)) {
      return message.channel
        .send(`:stopwatch: | Please wait for 10 second`)
        .then(m => {
          m.delete({ timeout: cdtime * 600 });
        });
    }

    cooldown.add(message.author.id);

    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, cdtime * 1000);
    if (!message.guild.member(message.author).hasPermission("MUTE_MEMBERS"))
      return message.channel.send(
        "**Please Check Your Permission MUTE_MEBMERS**"
      );
    if (!message.guild.member(client.user).hasPermission("MUTE_MEMBERS"))
      return message.channel.send(
        "**Please Check My Permission MUTE_MEBMERS**"
      );
    if (!user)
      return message.channel.send(`**>>> ${prefix}mute <@mention Or ID>**`);
    let mute = message.guild.roles.cache.find(
      role => role.name === "Muted",
      "Muted By BlackSestam"
    );
    if (!mute)
      mute = await message.guild.roles.create({
        data: {
          name: "Muted",
          color: "#0000",
          permissions: []
        }
      });
    message.guild.channels.cache.forEach(async channel => {
      await channel.createOverwrite(mute, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false
      });
    });
    message.guild.member(user).roles.add(mute);
    message.channel.send(`**${user.username} has been muted!**`);
  }
  if (message.content.toLowerCase() === `${prefix}help mute`) {
    let mute = new Discord.MessageEmbed()
      .setTitle(`Command: Mute `)
      .addField("By", message.author.tag)
      .addField("Usage", `${prefix}mute @user`)
      .addField("Information", "Mute Members");
    message.channel.send(mute);
  }
});
/////////////////roles//
client.on("message", message => {
  if (message.content.toLowerCase() === prefix + "roles") {
    if (cooldown.has(message.author.id)) {
      return message.channel
        .send(`:stopwatch: | Please wait for 10 second`)
        .then(m => {
          m.delete({ timeout: cdtime * 600 });
        });
    }

    cooldown.add(message.author.id);

    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, cdtime * 1000);
    let roles = message.guild.roles.cache.map(r => `> ${r.name}  `).join("\n");
    let embed = new Discord.MessageEmbed()
      .setTitle("Server Roles")
      .setDescription(" ```javascript\n" + roles + "``` ");
    message.channel.send(embed);
  }
  if (message.content.toLowerCase() === prefix + "help roles") {
    let roles = new Discord.MessageEmbed()
      .setTitle(`Command: roles `)
      .addField("Usage", `${prefix}roles`)
      .addField("Information", "Show All Roles For Server");
    message.channel.send(roles);
  }
});
/////////////////bans
client.on("message", message => {
  if (message.content.toLowerCase() === prefix + "bans") {
    if (cooldown.has(message.author.id)) {
      return message.channel
        .send(`:stopwatch: | Please wait for 10 second`)
        .then(m => {
          m.delete({ timeout: cdtime * 600 });
        });
    }

    cooldown.add(message.author.id);

    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, cdtime * 1000);
    message.guild
      .fetchBans()
      .then(bans => message.channel.send(`**__${bans.size}__ Bans**`))
      .catch(error => {
        message.channel.send(error.message);
      });
  }
  if (message.content.toLowerCase() === prefix + "hbans") {
    let unban = new Discord.MessageEmbed()
      .setTitle(`Command: bans `)
      .addField("Usage", `${prefix}bans`)
      .addField("Information", "bans count");
    message.channel.send(unban);
  }
});
/////////avatar/////////
client.on("message", async message => {
  let command = message.content.toLowerCase().split(" ")[0];
  command = command.slice(prefix.length);
  if (command == "avatar") {
    if (cooldown.has(message.author.id)) {
      return message.channel
        .send(`:stopwatch: | Please wait for 10 second`)
        .then(m => {
          m.delete({ timeout: cdtime * 600 });
        });
    }

    cooldown.add(message.author.id);

    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, cdtime * 1000);
    let args = message.content.split(" ");
    let user =
      message.mentions.users.first() ||
      message.author ||
      message.guild.member.cache.get(args[1]);
    message.channel.send(
      new Discord.MessageEmbed()
        .setAuthor(user.username, user.avatarURL())
        .setDescription(`**[Avatar Link](${user.avatarURL()})**`)
        .setImage(user.avatarURL({ dynamic: true, format: "png", size: 1024 }))
    );
  }
});
/////////////server
client.on("message", black => {
  if (black.content.startsWith(prefix + "server")) {
    if (cooldown.has(black.author.id)) {
      return black.channel
        .send(`:stopwatch: | Please wait for 10 second`)
        .then(m => {
          m.delete({ timeout: cdtime * 600 });
        });
    }

    cooldown.add(black.author.id);

    setTimeout(() => {
      cooldown.delete(black.author.id);
    }, cdtime * 1000);
    var blackjack = new Discord.MessageEmbed()
      .setAuthor(black.guild.name)
      .setThumbnail(black.guild.iconURL())
      .setTitle("**Info Server**")
      .addField("**Server Name:**", `${black.guild.name}`)
      .addField("**Owner Server:**", `<@${black.guild.ownerID}>`)
      .addField("**Server ID:**", `${black.guild.id}`)
      .addField("**Created:**", `${black.guild.createdAt.toLocaleString()}`)
      .addField("**Emojis**", `${black.guild.emojis.cache.size}`, true)
      .addField("**Members:**", `${black.guild.memberCount}`)
      .addField("**Channels:**", `${black.guild.channels.cache.size}`)
      .addField("**Region**:", `${black.guild.region}`)
      .addField(`**Boosts**`, `${black.guild.premiumSubscriptionCount}`, true)
      .addField("**Roles:**", ` ${black.guild.roles.cache.size}`)
      .addField("AFK Timeout", black.guild.afkTimeout / 60 + ' minutes', true)
      .setFooter(`Requested | ${black.author.tag}`, black.author.avatarURL())
      .setColor("RANDOM")
      .setTimestamp();
    black.channel.send(blackjack);
  }
});
//////////support/////
client.on('message', message => {
  if(message.content.startsWith(`${prefix}support`)){
    var embed = new Discord.MessageEmbed()
    .setTitle("Click Here")
    .setURL("https://discord.gg/xMYBJaCFcf")
    .setTimestamp()
    .setFooter(`Requested By | ${message.author.username}`)
    .setColor("RANDOM")
    message.channel.send("**Check Your DM**")
    message.author.send({embed})
  }
});
///////////unban/////
client.on("message", message => {
  let command = message.content.split(" ")[0];
  if (command == prefix + "unban") {
    if (cooldown.has(message.author.id)) {
      return message.channel
        .send(`:stopwatch: | Please wait for 10 second`)
        .then(m => {
          m.delete({ timeout: cdtime * 600 });
        });
    }

    cooldown.add(message.author.id);

    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, cdtime * 1000);
    if (!message.member.hasPermission("BAN_MEMBERS")) return;
    let args = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    if (args == "all") {
      message.guild.fetchBans().then(zg => {
        zg.forEach(Saad => {
          message.guild.unban(Saad);
        });
      });
      return message.channel.send("**✅ Unbanned all members **");
    }
    if (!args) return message.channel.send("**Please Type the member ID**");
    message.guild
      .unban(args)
      .then(m => {
        message.channel.send(`✅  **-** **Done Unbanned ${m.username}**`);
      })
      .catch(stry => {
        message.channel.send(
          ` :x: **-** **I can't find \`${args}\` in the ban list**`
        );
      });
  }
});
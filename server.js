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

///////:::://////
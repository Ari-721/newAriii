const { MessageEmbed } = require("discord.js");


  const client = new Client();
 client.on("message", message => {
    if(message.author.bot) return;
    if (message.content.indexOf(PREFIX) !== 0) return;
 
    const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase()
        if (cmd === "help") {
            const helpEmbed = new Discord.MessageEmbed()
                    .setTitle(`${client.user.username}'s Help Menu`)
                    .setDescription(`**PREFIX - \`${PREFIX}\`**`)
                    .addField("`ping`", "Check my latency to discord servers :D")
                    .addField("`kick`", `Kick someone for being disgracefull\n**Usage: ${PREFIX}kick [@USER] <REASON>**`)
                    .addField("`ban`", `Ban someone for being naughty\n**Usage: ${PREFIX}ban [@USER] <REASON>**`)
                    .addField("`add`", `Add a role to a user\n**Usage: ${PREFIX}add [@USER] [ROLE]**`)
                    .addField("`remove`", `Remove a role from a user\n**Usage: ${PREFIX}remove [@USER] [ROLE]**`)
                    .addField("`purge`", `Delete messages in bulk and be lazy :P\n**Usage: ${PREFIX}purge [AMOUNT]**`)
                    .addField("`rps`", `A fun rps command lel\n**Usage: ${PREFIX}rps [rock / paper / scissors]**`)
            message.channel.send(helpEmbed)
       `}

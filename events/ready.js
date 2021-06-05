module.exports = async (client) => {
  console.log(`[API] Logged in as ${client.user.username}`);
  await client.user.setActivity( `?help |${client.guilds.cache.size} |Server's |User's | ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}`, {
    type: "LISTENING",//can be LISTENING, WATCHING, PLAYING, STREAMING
  });
};
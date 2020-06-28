const Discord = require('discord.js');
const discord = new Discord.Client();

discord.on('ready', () => {
  console.log(`Logged in as ${discord.user.tag}!`);
});

discord.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

discord.login(process.env.discordToken);

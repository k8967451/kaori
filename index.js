const Discord = require('discord.js')
const ytdl = require('ytdl-core');

const discord = new Discord.Client()

discord.on('ready', () => {
  console.log(`Logged in as ${discord.user.tag}!`)
})

discord.on('message', msg => {
  if (msg.content.includes('play')) {
    const voiceChannel = msg.member.voice.channel;

    if (voiceChannel) {
      voiceChannel.join()
        .then(connection => {
          connection
            .play(ytdl('https://youtu.be/L8UUYfe6-UA'))
            .on('finish', () => {
              console.log('Finish')
            })
            .on('error', err => console.error(err))
        })
    }
  }
})

discord.login(process.env.discordToken)

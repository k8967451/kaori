const Discord = require('discord.js')
const ytdl = require('ytdl-core')

const initEmbed = new Discord.MessageEmbed()
  .setColor(process.env.color || '#f7cac9')

const play = async (url, msg) => {
  let embed = initEmbed
  const info = await ytdl.getInfo(ytdl.getURLVideoID(url))
  embed.setTitle(info.title).setURL(info.video_url)
  msg.channel.send({ embed })
  msg.member.voice.channel.join()
    .then(conn => {
      conn
        .play(ytdl(url), { bitrate: 'auto' })
        .on('finish', () => {
          conn.disconnect()
        })
        .on('error', err => console.error(err))
    })
}

const index = async msg => {
  initEmbed.setTimestamp().setFooter(msg.author.username, msg.author.avatarURL())

  if (msg.content.includes('play')) {
    if (msg.member.voice.channel) {
      play('https://youtu.be/L8UUYfe6-UA', msg)
    } else {
      let embed = initEmbed
      embed.setDescription('음악을 재생하려면 음성 채널에 있어야 해!')
      msg.channel.send({ embed })
    }
  }
}

module.exports = index

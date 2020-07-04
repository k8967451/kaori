const Discord = require('discord.js')
const ytdl = require('ytdl-core')

const play = async (id, msg, embed) => {
  const info = await ytdl.getInfo(id)
  embed
    .setTitle(info.title)
    .setURL(info.video_url)
    .setImage(`https://img.youtube.com/vi/${info.video_id}/maxresdefault.jpg`)
  msg.channel.send({ embed })
  msg.member.voice.channel.join()
    .then(conn => {
      conn
        .play(ytdl(id), { bitrate: 'auto' })
        .on('finish', () => {
          conn.disconnect()
        })
        .on('error', err => console.error(err))
    })
}

const index = async msg => {
  const embed = new Discord.MessageEmbed()
    .setColor(process.env.color || '#f7cac9')
    .setTimestamp()
    .setFooter(msg.author.username, msg.author.avatarURL())

  if (msg.content.includes('play')) {
    if (msg.member.voice.channel) {
      const url = msg.content.match(/(http(s)?:\/\/)?(www.)?youtu(be|.be)?(\.com)?\/.+/gi)
      console.log(url)
      if (url[0]) {
        play(ytdl.getVideoID(url[0]), msg, embed)
      } else {
        embed.setDescription('정확한 Youtube URL 주소를 보내줘!')
        msg.channel.send({ embed })
      }
    } else {
      embed.setDescription('음악을 재생하려면 음성 채널에 있어야 해!')
      msg.channel.send({ embed })
    }
  }
}

module.exports = index

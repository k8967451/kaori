import ytdl from 'ytdl-core'
import { player } from '../utils'

const play = async (msg, embed, data) => {
  if (msg.member.voice.channel) {
    const url = msg.content.match(/(http(s)?:\/\/)?(www.)?youtu(be|.be)?(\.com)?\/.+/gi)
    if (url) {
      if (!data[msg.guild.id]) {
        await msg.member.voice.channel.join().then(conn => {
          data[msg.guild.id] = {
            voiceChannel: msg.member.voice.channel,
            conn,
            queue: []
          }
        })
        for (const key in url) {
          const id = ytdl.getVideoID(url[key])
          data[msg.guild.id].queue.push({ id: id, tag: msg.author.id })
          if (key === '0') {
            player(msg, embed, data)
          } else {
            const info = await ytdl.getInfo(id)
            embed.setColor(process.env.color || '#f7cac9')
              .setTimestamp()
              .setFooter(msg.author.username, msg.author.avatarURL())
              .setTitle(info.videoDetails.title)
              .setURL(info.videoDetails.video_url)
              .setDescription('음악을 대기열에 추가했어!')
            msg.channel.send(embed)
          }
        }
      } else if (msg.member.voice.channel != data[msg.guild.id].voiceChannel) {
        embed.setDescription('음악을 추가하려면 동일한 음성 채널에 있어야 해!')
        msg.channel.send(embed)
      } else {
        url.forEach(async e => {
          const id = ytdl.getVideoID(e)
          data[msg.guild.id].queue.push({ id: id, tag: msg.author.id })
          const info = await ytdl.getInfo(id)
          embed.setTitle(info.videoDetails.title)
            .setURL(info.videoDetails.video_url)
            .setDescription('음악을 대기열에 추가했어!')
          msg.channel.send(embed)
        })
      }
    } else {
      embed.setDescription('정확한 Youtube URL 주소를 보내줘!')
      msg.channel.send(embed)
    }
  } else {
    embed.setDescription('음악을 재생하려면 음성 채널에 있어야 해!')
    msg.channel.send(embed)
  }
}

export default play

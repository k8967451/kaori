import ytdl from 'ytdl-core'
import { embed } from '../utils'

const player = async (msg, data) => {
  const current = data[msg.guild.id].queue.shift()
  const initEmbed = embed(current.msg)
  const info = await ytdl.getInfo(current.id)
  initEmbed.setTitle(info.videoDetails.title)
    .setURL(info.videoDetails.video_url)
    .setImage(`https://img.youtube.com/vi/${info.videoDetails.videoId}/maxresdefault.jpg`)
  msg.channel.send(initEmbed)
  data[msg.guild.id].conn
    .play(ytdl(current.id), { bitrate: 'auto' })
    .on('finish', () => {
      if (data[msg.guild.id].queue.length) {
        player(msg, data)
      } else {
        data[msg.guild.id].conn.disconnect()
        data[msg.guild.id] = null
      }
    })
    .on('error', err => console.error(err))
  data[msg.guild.id].conn.dispatcher.setVolume(0.5)
}

export default player

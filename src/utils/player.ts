import ytdl from 'ytdl-core'
import { embed } from '../utils'

const player = async (msg, data) => {
  if (!data[msg.guild.id].conn) {
    await data[msg.guild.id].voiceChannel.join().then(conn => {
      data[msg.guild.id].conn = conn
    })
  }

  const current = data[msg.guild.id].queue.shift()
  const initEmbed = embed(current.msg)
  initEmbed.setTitle(current.title)
    .setURL(current.url)
    .setImage(`https://img.youtube.com/vi/${current.id}/maxresdefault.jpg`)
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
  data[msg.guild.id].conn.dispatcher.setVolume(data[msg.guild.id].volume || 0.5)
}

export default player

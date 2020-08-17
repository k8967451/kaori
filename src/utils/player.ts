import ytdl from 'ytdl-core'

const player = async (msg, embed, data) => {
  const current = data[msg.guild.id].queue.shift()
  const info = await ytdl.getInfo(current.id)
  embed.setTitle(info.videoDetails.title)
    .setURL(info.videoDetails.video_url)
    .setImage(`https://img.youtube.com/vi/${info.videoDetails.videoId}/maxresdefault.jpg`)
  msg.channel.send(embed)
  data[msg.guild.id].conn
    .play(ytdl(current.id), { bitrate: 'auto' })
    .on('finish', () => {
      if (data[msg.guild.id].queue.length) {
        player(msg, embed, data)
      } else {
        data[msg.guild.id].conn.disconnect()
        data[msg.guild.id] = null
      }
    })
    .on('error', err => console.error(err))
  data[msg.guild.id].conn.dispatcher.setVolume(0.5)
}

export default player

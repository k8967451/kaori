import ytdl from 'ytdl-core'
import ytpl from 'ytpl'
import { player } from '../utils'

const play = async (msg, embed, data) => {
  if (!msg.member.voice.channel) {
    embed.setDescription('음악을 재생하려면 음성 채널에 있어야 해!')
    msg.channel.send(embed)
    return
  }

  const url = msg.content.match(/(http(s)?:\/\/)?(www.)?youtu(be|.be)?(\.com)?\/.+/gi)
  if (!url) {
    embed.setDescription('정확한 Youtube URL 주소를 보내줘!')
    msg.channel.send(embed)
    return
  }

  if (data[msg.guild.id] && msg.member.voice.channel != data[msg.guild.id].voiceChannel) {
    embed.setDescription('음악을 추가하려면 동일한 음성 채널에 있어야 해!')
    msg.channel.send(embed)
    return
  }

  if (!data[msg.guild.id]) {
    data[msg.guild.id] = {
      voiceChannel: msg.member.voice.channel,
      conn: null,
      queue: []
    }
  }

  let playlist = []
  for (const key in url) {
    const e = url[key]
    const validateVideo = ytdl.validateURL(e)
    const validatePL = ytpl.validateURL(e)

    if (validateVideo) {
      const videoID = ytdl.getVideoID(e)
      data[msg.guild.id].queue.push({ id: videoID, msg: msg })
      if (key == '0' && !data[msg.guild.id].conn) player(msg, data)
      else playlist.push(await ytdl.getInfo(videoID))
    } else if (validatePL) {
      const pl = await ytpl(await ytpl.getPlaylistID(e))
      pl.items.forEach(item => {
        data[msg.guild.id].queue.push({ id: item.id, msg: msg })
      })
      if (key == '0' && !data[msg.guild.id].conn) player(msg, data)
    }
  }

  if (playlist.length) {
    embed.setTitle('Add')
      .setDescription(playlist.length + '개의 음악을 대기열에 추가했어!')
    playlist.forEach(e => {
      const lengthSeconds = Number(e.videoDetails.lengthSeconds)
      const sec = lengthSeconds % 60
      const min = Math.floor(lengthSeconds / 60 % 60)
      const hour = Math.floor(lengthSeconds / 60 / 60)
      embed.addField(e.videoDetails.title, `${hour ? hour + '시간' : ''} ${min ? min + '분' : ''} ${sec ? sec + '초' : ''}`)
    })
    msg.channel.send(embed)
  }
}

export default play

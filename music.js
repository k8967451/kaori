const ytdl = require('ytdl-core')

const index = async msg => {
  const embed = {
    color: process.env.COLOR || '#f7cac9',
    timestamp: new Date(),
    footer: {
      text: msg.author.username,
      icon_url: msg.author.avatarURL()
    }
  }

  if (msg.content.includes('play')) {
    const voiceChannel = msg.member.voice.channel;

    if (voiceChannel) {
      voiceChannel.join()
        .then(conn => {
          conn
            .play(ytdl('https://youtu.be/L8UUYfe6-UA'), { bitrate: 'auto' })
            .on('finish', () => {
              conn.disconnect()
              embed.description = 'Finish'
              msg.channel.send({ embed })
            })
            .on('error', err => console.error(err))
        })
    } else {
      embed.description = '음악을 재생하려면 음성 채널에 있어야 해!'
      msg.channel.send({ embed })
    }
  }
}

module.exports = index

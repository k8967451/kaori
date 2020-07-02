const ytdl = require('ytdl-core')

const index = async (msg) => {
	if (msg.content.includes('play')) {
    const voiceChannel = msg.member.voice.channel;

    if (voiceChannel) {
      voiceChannel.join()
        .then(conn => {
          conn
            .play(ytdl('https://youtu.be/L8UUYfe6-UA'), { bitrate: 'auto' })
            .on('finish', () => {
              conn.disconnect()
              console.log('Finish')
            })
            .on('error', err => console.error(err))
        })
    }
  }
}

module.exports = index

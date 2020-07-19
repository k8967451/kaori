const volume = (msg, embed, data) => {
  if (data[msg.guild.id]) {
    if (msg.member.voice.channel == data[msg.guild.id].voiceChannel) {
      const number = Number(msg.content.replace(/[^{0-9.}]/gi, ''))
      if (number) {
        if (100 >= number && number >= 0) {
          data[msg.guild.id].conn.dispatcher.setVolume(number / 100)
          embed.setTitle('Volume')
          embed.setDescription('음량을 ' + number + '으로 설정했어!')
          msg.channel.send({ embed })
        } else {
          embed.setDescription('0에서 100 사이의 값을 입력해줘!')
          msg.channel.send({ embed })
        }
      } else {
        embed.setDescription('음량은 ' + data[msg.guild.id].conn.dispatcher.volume * 100 + '으로 설정되어 있어!')
        msg.channel.send({ embed })
      }
    } else {
      embed.setDescription('음량을 조절하려면 동일한 음성 채널에 있어야 해!')
      msg.channel.send({ embed })
    }
  } else {
    embed.setDescription('음악이 재생중이지 않아!')
    msg.channel.send({ embed })
  }
}

export default volume

const volume = (msg, embed, data) => {
  if (!data[msg.guild.id]) {
    embed.setDescription('음악이 재생중이지 않아!')
    msg.channel.send(embed)
    return
  }

  if (msg.member.voice.channel != data[msg.guild.id].voiceChannel) {
    embed.setDescription('음량을 조절하려면 동일한 음성 채널에 있어야 해!')
    msg.channel.send(embed)
    return
  }

  const num: number = msg.content.replace(/[^{0-9.}]/gi, '')
  if (!num) {
    embed.setDescription('음량은 ' + Math.floor(data[msg.guild.id].conn.dispatcher.volume * 100) + '으로 설정되어 있어!')
    msg.channel.send(embed)
    return
  }

  if (100 >= num && num >= 1) {
    embed.setDescription('1에서 100 사이의 값을 입력해줘!')
    msg.channel.send(embed)
    return
  }

  data[msg.guild.id].conn.dispatcher.setVolume(num / 100)
  data[msg.guild.id].volume = num / 100
  embed.setTitle('Volume')
    .setDescription('음량을 ' + num + '으로 설정했어!')
  msg.channel.send(embed)
}

export default volume

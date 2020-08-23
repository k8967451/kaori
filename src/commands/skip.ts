const skip = (msg, embed, data) => {
  if (!data[msg.guild.id]) {
    embed.setDescription('음악이 재생중이지 않아!')
    msg.channel.send(embed)
    return
  }

  if (!data[msg.guild.id].queue.length) {
    embed.setDescription('스킵할 음악이 없는거 같아!')
    msg.channel.send(embed)
    return
  }

  if (msg.member.voice.channel != data[msg.guild.id].voiceChannel) {
    embed.setDescription('음악을 스킵하려면 동일한 음성 채널에 있어야 해!')
    msg.channel.send(embed)
    return
  }

  data[msg.guild.id].conn.dispatcher.end()
}

export default skip

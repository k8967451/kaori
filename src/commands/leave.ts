const leave = (msg, embed, data) => {
  if (!data[msg.guild.id]) {
    embed.setDescription('음악이 재생중이지 않아!')
    msg.channel.send(embed)
    return
  }

  data[msg.guild.id].voiceChannel.leave()
  data[msg.guild.id] = null
  embed.setTitle('Leave')
    .setDescription('음성 채널을 나왔어!')
  msg.channel.send(embed)
}

export default leave


const skip = (msg, embed, data) => {
  if (msg.content.includes('skip')) {
    if (data[msg.guild.id]) {
      if (data[msg.guild.id].queue.length) {
        if (msg.member.voice.channel == data[msg.guild.id].voiceChannel) {
          data[msg.guild.id].conn.dispatcher.end()
        } else {
          embed.setDescription('음악을 스킵하려면 동일한 음성 채널에 있어야 해!')
          msg.channel.send({ embed })
        }
      } else {
        embed.setDescription('스킵할 음악이 없는거 같아!')
        msg.channel.send({ embed })
      }
    } else {
      embed.setDescription('음악이 재생중이지 않아!')
      msg.channel.send({ embed })
    }
  }
}

export default skip

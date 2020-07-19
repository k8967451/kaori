import ytdl from 'ytdl-core'

const queue = async (msg, embed, data) => {
  if (data[msg.guild.id]) {
    if (data[msg.guild.id].queue.length) {
      embed.setTitle('Queue')
      for (const key in data[msg.guild.id].queue) {
        const info = await ytdl.getInfo(data[msg.guild.id].queue[key])
        embed.addField(Number(key) + 1, info.title)
      }
      msg.channel.send({ embed })
    } else {
      embed.setDescription('음악 대기열이 없어!')
      msg.channel.send({ embed })
    }
  } else {
    embed.setDescription('음악이 재생중이지 않아!')
    msg.channel.send({ embed })
  }
}

export default queue

const queue = async (msg, embed, data) => {
  if (!data[msg.guild.id]) {
    embed.setDescription('음악이 재생중이지 않아!')
    msg.channel.send(embed)
    return
  }

  if (!data[msg.guild.id].queue.length) {
    embed.setDescription('음악 대기열이 없어!')
    msg.channel.send(embed)
    return
  }

  embed.setTitle('Queue')
  for (const key in data[msg.guild.id].queue) {
    const e = data[msg.guild.id].queue[key]
    embed.addField(`${Number(key) + 1}. ${e.title}`, `${e.duration} <@${e.msg.author.id}>님이 추가함`)
  }
  msg.channel.send(embed)
}

export default queue

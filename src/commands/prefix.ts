const prefix = async (msg, embed, data) => {
  !data[msg.channel.id] ? data[msg.channel.id] = {} : null
  const getPrefix = data[msg.channel.id] ? data[msg.channel.id].prefix ? data[msg.channel.id].prefix : process.env.prefix : process.env.prefix
  data[msg.channel.id].prefix = msg.content.replace(RegExp(`(kaori|prefix|${getPrefix}| )`, 'gi'), '')
  embed.setTitle('Prefix')
    .setDescription(data[msg.channel.id].prefix ? `${data[msg.channel.id].prefix}로 접두사를 변경했어!` : '접두사를 제거했어! 이제 Kaori라고만 부를 수 있어')
  msg.channel.send(embed)
}

export default prefix

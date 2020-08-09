const ping = async (msg, embed, data, client) => {
  embed.setTitle('Ping!')
    .addField('Discord Server', '측정중...')
    .addField('지연 시간', '측정중...')
  const pingMsg = await msg.channel.send(embed)
  embed.fields = []
  embed.setTitle('Pong!')
    .addField('Discord Server', Math.round(client.ws.ping) + 'ms')
    .addField('지연 시간', pingMsg.createdTimestamp - msg.createdTimestamp + 'ms')
  pingMsg.edit(embed)
}

export default ping

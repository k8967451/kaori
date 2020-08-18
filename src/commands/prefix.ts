import { load, save } from '../utils'

const prefix = async (msg, embed) => {
  const data = load('data/servers.json')
  data[msg.channel.id] ? null : data[msg.channel.id] = {}
  const getPrefix = data[msg.channel.id] ? data[msg.channel.id].prefix ? data[msg.channel.id].prefix : null : null
  data[msg.channel.id].prefix = msg.content.replace(RegExp(`(kaori|${getPrefix}|prefix| )`, 'gi'), '')
  embed.setTitle('Prefix')
    .setDescription(data[msg.channel.id].prefix ? `${data[msg.channel.id].prefix}로 접두사를 변경했어!` : '접두사를 제거했어! 이제 Kaori라고만 부를 수 있어')
  msg.channel.send(embed)
  save('data/servers.json', data)
}

export default prefix

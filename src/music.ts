import discord from 'discord.js'
import { leave, play, queue, skip, volume } from './commands'
const data = {}

const index = async msg => {
  const embed = new discord.MessageEmbed()
    .setColor(process.env.color || '#f7cac9')
    .setTimestamp()
    .setFooter(msg.author.username, msg.author.avatarURL())

  play(msg, embed, data)
  skip(msg, embed, data)
  queue(msg, embed, data)
  volume(msg, embed, data)
  leave(msg, embed, data)

  if (msg.content.match(/(remove|delete|del)/i)) {
    if (data[msg.guild.id]) {
      if (data[msg.guild.id].queue.length) {
        const number = Number(msg.content.replace(/[^{0-9}]/gi, ''))
        if (number > 0) {
          data[msg.guild.id].queue.splice(number - 1, 1)
          embed.setTitle('Remove')
          embed.setDescription('음악 대기열에서 삭제했어!')
          msg.channel.send({ embed })
        } else {
          embed.setDescription('음악을 삭제하려면 대기열에 번호를 알려줘!')
          msg.channel.send({ embed })
        }
      } else {
        embed.setDescription('음악 대기열이 없어!')
        msg.channel.send({ embed })
      }
    } else {
      embed.setDescription('음악이 재생중이지 않아!')
      msg.channel.send({ embed })
    }
  }
}

export default index

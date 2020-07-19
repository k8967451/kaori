import discord from 'discord.js'
import { play, skip, queue } from './commands'
const data = {}

const index = async msg => {
  const embed = new discord.MessageEmbed()
    .setColor(process.env.color || '#f7cac9')
    .setTimestamp()
    .setFooter(msg.author.username, msg.author.avatarURL())

  play(msg, embed, data)
  skip(msg, embed, data)
  queue(msg, embed, data)

  if (msg.content.match(/volume/i)) {
    if (data[msg.guild.id]) {
      if (msg.member.voice.channel == data[msg.guild.id].voiceChannel) {
        const number = Number(msg.content.replace(/[^{0-9.}]/gi, ''))
        if (number) {
          if (100 >= number && number >= 0) {
            data[msg.guild.id].conn.dispatcher.setVolume(number / 100)
            embed.setTitle('Volume')
            embed.setDescription('음량을 ' + number + '으로 설정했어!')
            msg.channel.send({ embed })
          } else {
            embed.setDescription('0에서 100 사이의 값을 입력해줘!')
            msg.channel.send({ embed })
          }
        } else {
          embed.setDescription('음량은 ' + data[msg.guild.id].conn.dispatcher.volume * 100 + '으로 설정되어 있어!')
          msg.channel.send({ embed })
        }
      } else {
        embed.setDescription('음량을 조절하려면 동일한 음성 채널에 있어야 해!')
        msg.channel.send({ embed })
      }
    } else {
      embed.setDescription('음악이 재생중이지 않아!')
      msg.channel.send({ embed })
    }
  }

  if (msg.content.match(/leave/i)) {
    console.log(1)
    if (data[msg.guild.id]) {
      data[msg.guild.id].voiceChannel.leave()
      data[msg.guild.id] = null
      embed.setTitle('Leave')
      embed.setDescription('음성 채널을 나왔어!')
      msg.channel.send({ embed })
    } else {
      embed.setDescription('음악이 재생중이지 않아!')
      msg.channel.send({ embed })
    }
  }

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

import discord from 'discord.js'
import { leave, play, queue, remove, skip, volume } from './commands'
const data = {}

const index = async msg => {
  const embed = new discord.MessageEmbed()
    .setColor(process.env.color || '#f7cac9')
    .setTimestamp()
    .setFooter(msg.author.username, msg.author.avatarURL())

  leave(msg, embed, data)
  play(msg, embed, data)
  queue(msg, embed, data)
  remove(msg, embed, data)
  skip(msg, embed, data)
  volume(msg, embed, data)
}

export default index

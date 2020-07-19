import discord from 'discord.js'
import Embed from './embed'
import { leave, play, queue, remove, skip, volume } from './commands'
const data = {}

const index = async msg => {
  const embed = Embed(msg)

  leave(msg, embed, data)
  play(msg, embed, data)
  queue(msg, embed, data)
  remove(msg, embed, data)
  skip(msg, embed, data)
  volume(msg, embed, data)
}

export default index

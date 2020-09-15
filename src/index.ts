import discord from 'discord.js'
import music from './music'
import { load } from './utils'

const client = new discord.Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', async msg => {
  try {
    if (msg.author.bot) return

    if (msg.system) {
      if (msg.type == 'GUILD_MEMBER_JOIN') msg.react('👋')
      else if (msg.type == 'PINS_ADD') msg.react('📌')
      return
    }

    const data = load('data/servers.json')[msg.channel.id]
    const prefix = data ? data.prefix ? data.prefix : null : null
    if (!msg.content.startsWith(prefix) && msg.content.search(RegExp(process.env.name, 'i')) == -1) return

    music(msg, client)
  } catch (error) {
    console.warn(error)
  }
})

const messages = load('src/messages.json')
const length = messages.activity.length
setInterval(async () => {
  messages.activity[length] = '서버 ' + client.guilds.cache.size + '개에서 사용'
  await client.user.setActivity(messages.activity[Math.floor(Math.random() * messages.activity.length)])
}, 10000)

client.login(process.env.token)

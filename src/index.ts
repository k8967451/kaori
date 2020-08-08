import discord from 'discord.js'
import music from './music'
import { embed, load } from './utils'

const client = new discord.Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', async msg => {
  try {
    if (msg.author.bot) return

    const Embed = embed(msg)

    const data = load('data/servers.json')

    const getPrefix = data[msg.channel.id] ? data[msg.channel.id].prefix ? data[msg.channel.id].prefix : null : null
    if (!msg.content.startsWith(getPrefix) && msg.content.search(RegExp(process.env.name, 'i')) == -1) return

    if (msg.content.match(/(핑|ping)/i)) {
      Embed.setTitle(msg.content.includes('핑') ? '퐁!' : 'Pong!')
        .addField('Discord Server', '측정중...')
        .addField('지연 시간', '측정중...')
      let ping = await msg.channel.send(Embed)
      Embed.fields = []
      Embed.addField('Discord Server', Math.round(client.ws.ping) + 'ms')
        .addField('지연 시간', ping.createdTimestamp - msg.createdTimestamp + 'ms')
      ping.edit(Embed)
    }

    music(msg)
  } catch (error) {
    console.warn(error)
  }
})

setInterval(async () => {
  await client.user.setActivity('서버 ' + client.guilds.cache.size + '개에서 사용')
}, 10000)

client.login(process.env.token)

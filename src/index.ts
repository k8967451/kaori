import discord from 'discord.js'
import music from './music'
import { embed, load, save } from './utils'

const client = new discord.Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', async msg => {
  try {
    if (msg.author.bot) return

    const Embed = embed(msg)

    let data = load('data/servers.json')
    const prefix = data[msg.channel.id] ? data[msg.channel.id].prefix ? data[msg.channel.id].prefix : process.env.prefix : process.env.prefix
    if (!msg.content.startsWith(prefix) && msg.content.search(new RegExp(RegExp(process.env.name, 'i'))) == -1) return

    if (msg.content.match(/(핑|ping)/i)) {
      Embed.setTitle(msg.content.includes('핑') ? '퐁!' : 'Pong!')
        .addField('Discord Server', '측정중...')
        .addField('지연 시간', '측정중...')
      let ping = await msg.channel.send(Embed)
      Embed.fields = []
      Embed.addField('Discord Server', Math.round(client.ws.ping) + 'ms')
        .addField('지연 시간', ping.createdTimestamp - msg.createdTimestamp + 'ms')
      ping.edit(Embed)
    } else if (msg.content.match(/prefix/i)) {
      !data[msg.channel.id] ? data[msg.channel.id] = {} : null
      data[msg.channel.id].prefix = msg.content.replace(new RegExp(`(kaori|prefix|${prefix}| )`, 'gi'), '')
      save('data/servers.json', data)
      Embed.setTitle('Prefix')
        .setDescription(data[msg.channel.id].prefix ? `${data[msg.channel.id].prefix}로 접두사를 변경했어!` : '접두사를 제거했어! 이제 Kaori라고만 부를 수 있어')
      msg.channel.send(Embed)
    } else {
      music(msg)
    }
  } catch (error) {
    console.warn(error)
  }
})

client.login(process.env.token)

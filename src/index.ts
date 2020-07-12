import discord from 'discord.js'
import music from './music'

const client = new discord.Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', async msg => {
  try {
    if (msg.author.bot) return

    if (!msg.content.startsWith(process.env.prefix) && msg.content.search(new RegExp(RegExp(process.env.name, 'i'))) == -1) return

    const embed = new discord.MessageEmbed()
      .setColor('#f7cac9')
      .setTimestamp()
      .setFooter(msg.author.username, msg.author.avatarURL());

    if (msg.content.match(/(핑|ping)/i)) {
      embed.setTitle(msg.content.includes('핑') ? '퐁!' : 'Pong!')
        .addField('Discord Server', '측정중...')
        .addField('지연 시간', '측정중...')
      let ping = await msg.channel.send({ embed })
      embed.fields = []
      embed.addField('Discord Server', Math.round(client.ws.ping) + 'ms')
        .addField('지연 시간', ping.createdTimestamp - msg.createdTimestamp + 'ms')
      ping.edit({ embed })
    } else if (msg.content.match(/(도움|도와|help)/i)) {
      embed.setTitle(msg.content.match(/help/i) ? 'Help!' : '도움말!')
        .addField('내가 필요하면 \'Kaori\'라고 불러줘', '음악을 재생하려면 \'!play YoutubeURL\'처럼 부탁해줘!\n스킵하려면 \'!skip\' 대기열은 \'!queue\'로 확인할 수 있어!\n자세한건 https://github.com/momenthana/kaori 여기서 참고하고')
      msg.channel.send({ embed })
    } else {
      music(msg)
    }
  } catch (error) {
    console.warn(error)
  }
})

client.login(process.env.token)
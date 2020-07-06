const Discord = require('discord.js')
const music = require('./music')

const discord = new Discord.Client()

discord.on('ready', () => {
  console.log(`Logged in as ${discord.user.tag}!`)
})

discord.on('message', async msg => {
  try {
    if (msg.author.bot) return

    if (!msg.content.startsWith(process.env.prefix) && msg.content.search(new RegExp(RegExp(process.env.name, 'i'))) == -1) return

    const embed = new Discord.MessageEmbed()
      .setColor('#f7cac9')
      .setTimestamp()
      .setFooter(msg.author.username, msg.author.avatarURL);

    if (msg.content.match(/(핑|ping)/)) {
      embed.setTitle(msg.content.includes('핑') ? '퐁!' : 'Pong!')
        .addField('Discord Server', '측정중...')
        .addField('지연 시간', '측정중...')
      let ping = await msg.channel.send({ embed })
      embed.fields = []
      embed.addField('Discord Server', Math.round(discord.ws.ping) + 'ms')
        .addField('지연 시간', ping.createdTimestamp - msg.createdTimestamp + 'ms')
      ping.edit({ embed })
    } else {
      music(msg)
    }
  } catch (error) {
    console.warn(error)
  }
})

discord.login(process.env.token)

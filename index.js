const Discord = require('discord.js')
const music = require('./music')

const discord = new Discord.Client()

discord.on('ready', () => {
  console.log(`Logged in as ${discord.user.tag}!`)
})

discord.on('message', msg => {
  try {
    if (msg.author.bot) return

    if (!msg.content.startsWith(process.env.prefix) && msg.content.search(new RegExp(RegExp(process.env.name, 'i'))) == -1) return

    music(msg)
  } catch (error) {
    console.warn(error)
  }
})

discord.login(process.env.token)

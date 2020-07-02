const Discord = require('discord.js')
const music = require('./music')

const discord = new Discord.Client()

discord.on('ready', () => {
  console.log(`Logged in as ${discord.user.tag}!`)
})

discord.on('message', msg => {
  music(msg)
})

discord.login(process.env.discordToken)

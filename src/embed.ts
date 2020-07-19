import discord from 'discord.js'

const embed = msg => {
	return new discord.MessageEmbed()
		.setFooter(msg.author.tag, msg.author.avatarURL())
		.setTimestamp(new Date())
		.setColor(msg.guild.me.displayColor)
}

export default embed

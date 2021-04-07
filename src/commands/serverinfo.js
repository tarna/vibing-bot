const { Command } = require('discord-akairo');
const ms = require('ms')
const mongoose = require('mongoose')
const { MessageEmbed } = require('discord.js')

class ServerInfoCommand extends Command {
	constructor() {
		super('serverinfo', {
			aliases: ['serverinfo', 'info'],
		});
	}

	async exec(msg, args) {

		const members = msg.guild.members.cache.filter(m => !m.user.bot).size
		const bots = msg.guild.members.cache.filter(m => m.user.bot).size
		const online = msg.guild.members.cache.filter(m => m.presence.status == 'online').size
		const offline = msg.guild.members.cache.filter(m => m.presence.status == 'offline').size
		const dnd = msg.guild.members.cache.filter(m => m.presence.status == 'dnd').size

		let embed = new MessageEmbed()
			.setTitle(msg.guild.name)
			.setImage(msg.guild.icon)
			.setColor('#0000FF')
			.addField('Server Info', `Owner: <@${msg.guild.ownerID}> \nMembers: ${members} \nBots: ${bots}`)
			.addField('Status', `Online: ${online} \nDND: ${dnd} \nOffline: ${offline}`)
		msg.channel.send(embed)
	}
}

module.exports = ServerInfoCommand;
const { Command } = require('discord-akairo');
const ms = require('ms')
const mongoose = require('mongoose')
const { MessageEmbed } = require('discord.js')

const { Remind } = require('../models/remind')

class RemindersCommand extends Command {
	constructor() {
		super('reminders', {
			aliases: ['reminders'],
		});
	}

	async exec(msg, args) {

		const reminders = await Remind.find({userId: msg.author.id})

		let embed = new MessageEmbed()
		embed.setTitle('Your reminders')
		embed.setColor('#0000FF')

		if(reminders.length == 0) return msg.reply('You do not have any active reminders set')

		reminders.forEach(d => {
			embed.addField(`In: ${ms(d.time - Date.now())}`, d.reminder)
		})
		return msg.channel.send(embed);

	}
}

module.exports = RemindersCommand;
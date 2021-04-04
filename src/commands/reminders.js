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

		if(reminders.length == 0) return msg.reply('You do not have any active reminders set')

		let index = 1
		let baseString = ''
		reminders.forEach(d => {
			baseString += `${index}. ${d.reminder} (${(ms(Math.abs(Date.now() - d.time)))})\nID: ${(d.id != undefined) ? d.id : 'N/A'}\n\n`
			index += 1
		})
		let embed = new MessageEmbed()
			.setTitle('Your reminders')
			.setColor('YELLOW')
			.setDescription(baseString)
		return msg.channel.send(embed);
	}
}

module.exports = RemindersCommand;
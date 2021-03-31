const { Command } = require('discord-akairo');
const ms = require('ms')
const mongoose = require('mongoose')

const { Remind } = require('../models/remind')

class RemindMeCommand extends Command {
	constructor() {
		super('remindme', {
			aliases: ['remindme', 'remind-me', 'rm', 'remind'],
			args: [
				{
					id: 'time'
				},
				{
					id: 'reminder',
					match: 'content'
				}
			]
		});
	}

	async exec(msg, args) {

		const reminder = args.reminder.replace(args.time, '').trim()
		
		const r = new Remind({
			userId: msg.author.id,
			time: new Date(Date.now() + ms(args.time)),
			reminder: reminder,
			active: true
		})

		r.save();

		msg.reply('reminder set!')

	}
}

module.exports = RemindMeCommand;
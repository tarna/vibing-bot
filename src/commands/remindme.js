const { Command } = require('discord-akairo');
const { Remind } = require('../models/remind')

class RemindMeCommand extends Command {
	constructor() {
		super('remindme', {
			aliases: ['remindme', 'remind-me', 'rm', 'remind'],
			args: [
				{
					id: 'time',
					type: 'duration',
					prompt: {
						timeout: 'The command has been cancelled, you have taken too long.',
						start: message => `${message.author}, in how long would you like to be reminded?`,
						retry: message => `${message.author}, in how long would you like to be reminded?`,
						ended: 'Too many attempts made! The command has been cancelled.',
						cancel: 'The command has been cancelled.',
						retries: 2,
						time: (25)*1000
					}
				},
				{
					id: 'reminder',
					match: 'content',
					prompt: {
						timeout: 'The command has been cancelled, you have taken too long.',
						start: message => `${message.author}, what would you like to be reminded of?`,
						retry: message => `${message.author}, what would you like to be reminded of?`,
						ended: 'Too many attempts made! The command has been cancelled.',
						cancel: 'The command has been cancelled.',
						retries: 2,
						time: (25)*1000
					}
				}
			]
		});
	}

	async exec(msg, args) {

		const reminder = args.reminder.replace(args.time, '').trim()
		
		const r = new Remind({
			userId: msg.author.id,
			time: new Date(Date.now() + args.time),
			reminder: reminder,
			active: true
		})

		r.save();

		msg.reply('reminder set!')

	}
}

module.exports = RemindMeCommand;
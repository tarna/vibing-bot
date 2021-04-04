const { Command } = require('discord-akairo');
const { Remind } = require('../models/remind')
const { MessageEmbed } = require('discord.js')
const dateFormat = require("dateformat");


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
					match: 'rest',
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
		
		const time = new Date(Date.now() + args.time)

		const r = new Remind({
			userId: msg.author.id,
			time: time,
			reminder: args.reminder,
			active: true
		})

		r.save();

		const embed = new MessageEmbed()
			.setColor('GREEN')
			.setTitle('⏰ New Reminder')
			.setDescription('You have set a new reminder!')
			.setFooter(`${msg.author.tag}`, msg.author.avatarURL())
			.setTimestamp();
		
		embed.addField('Time', `${dateFormat(time, "dddd, mmmm dS, yyyy, h:MM TT")}`, true)
		embed.addField('Reminder', `${args.reminder}`, true)
		msg.channel.send(embed)

	}
}

module.exports = RemindMeCommand;
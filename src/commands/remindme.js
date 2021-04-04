const { Command } = require('discord-akairo')
const { Remind } = require('../models/remind')
const { MessageEmbed } = require('discord.js')
const { customAlphabet } = require('nanoid')
const dateFormat = require("dateformat")


class RemindMeCommand extends Command {
	constructor() {
		super('remindme', {
			aliases: ['remindme', 'remind-me', 'rm', 'remind'],
			args: [
				{
					id: 'time',
					type: 'duration',
					prompt: {
						start: message => `${message.author}, in how long would you like to be reminded?`,
						retry: message => `${message.author}, in how long would you like to be reminded?`,
						ended: 'This command has been cancelled.',
						cancel: 'This command has been cancelled.',
						timeout: 'This command has been cancelled, you have taken too long.',
						retries: 2,
						time: (25)*1000
					}
				},
				{
					id: 'reminder',
					match: 'rest',
					prompt: {
						start: message => `${message.author}, what would you like to be reminded of?`,
						retry: message => `${message.author}, what would you like to be reminded of?`,
						ended: 'This command has been cancelled.',
						cancel: 'This command has been cancelled.',
						timeout: 'This command has been cancelled, you have taken too long.',
						retries: 2,
						time: (25)*1000
					}
				}
			]
		});
	}

	async exec(msg, args) {

		const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 8)
		
		const time = new Date(Date.now() + args.time)

		const id = nanoid()

		const embed = new MessageEmbed()
			.setColor('GREEN')
			.setTitle('⏰ New Reminder')
			.setDescription('You have set a new reminder!')
			.setFooter(`${msg.author.tag}`, msg.author.avatarURL())
			.setTimestamp();

		embed.addField('Time', `${dateFormat(time, "dddd, mmmm dS, yyyy, h:MM TT")} ${new Date().toLocaleTimeString('en-us',{timeZoneName:'short'}).split(' ')[2]}`, true)
		embed.addField('Reminder', `${args.reminder}`, true)
		embed.addField('ID', `${id}`, true)
		msg.channel.send(embed).then(embedMessage => {
			const url = embedMessage.url
			const r = new Remind({
				userId: msg.author.id,
				time: time,
				reminder: args.reminder,
				id: id,
				url: url,
				active: true
			})
	
			r.save();
		})
		return
	}
}

module.exports = RemindMeCommand;

const { Command } = require('discord-akairo');
const { Remind } = require('../models/remind')
const { MessageEmbed } = require('discord.js')
const { nanoid } = require('nanoid')
const dateFormat = require("dateformat");


class DeleteReminderCommand extends Command {
	constructor() {
		super('deletereminder', {
			aliases: ['drm', 'delete', 'remove'],
			args: [
				{
					id: 'id',
					type: 'content',
					prompt: {
						start: message => `${message.author}, what reminder would you like to remove?`,
						retry: message => `${message.author}, what reminder would you like to remove?`,
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
		
		const reminders = await Remind.find({userId: msg.author.id})
        let removed = false
        reminders.forEach(d => {
            if (args.id == d.id) {
                d.remove()
                removed = true
                return msg.reply(`You have removed the reminder with ID ${args.id}`)
            }
        })
        if (removed == false) {
            return msg.reply('You don\'t have a reminder with that ID!')
        }
    }
}

module.exports = DeleteReminderCommand;
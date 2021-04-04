const { Listener } = require('discord-akairo');
const { Remind } = require('../models/remind')
const { MessageEmbed } = require('discord.js')

class ReadyListener extends Listener {
	constructor() {
		super('ready', {
			emitter: 'client',
			event: 'ready'
		});
	}

	async exec() {
		console.log('I\'m ready!');
		this.client.user.setActivity('always vibing')

		setInterval(async () => {
			const reminders = await Remind.find({active: true})
			reminders.forEach(d => {
				if(Date.now() > d.time) {
					try {
						let user = this.client.users.cache.get(d.userId)
						const embed = new MessageEmbed()
							.setColor('GREEN')
							.setTitle('💥Reminder')
							.setDescription(`[You have set a reminder for this date!](${d.url})`)
				
						embed.addField('Reminder', `${d.reminder}`)
						embed.addField(`Reminder ID: ${d.id}`)
						user.send(embed)
					} catch(error) {
						console.log(`Uh oh! User with ID: ${d.userId} could not be found...`)
					}
					d.remove()
				}
			})

		}, 1000)

	}
}

module.exports = ReadyListener;
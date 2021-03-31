const { Listener } = require('discord-akairo');
const { Remind } = require('../models/remind')

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
				let time = d.time;
				if(Date.now() > d.time) {
					let user = this.client.users.cache.get(d.userId)
					user.send(`Reminder: ${d.reminder}`)
					d.remove()
				}
			})

		}, 1000)

	}
}

module.exports = ReadyListener;
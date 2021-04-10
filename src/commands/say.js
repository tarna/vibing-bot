const { Command } = require('discord-akairo');

class SayCommand extends Command {
	constructor() {
		super('say', {
			aliases: ['say'],
			args: [
				{
					id: 'channel',
					type: 'textChannel'
				},
				{
					id: 'text',
					match: 'restContent'
				}
			]
		});
	}

	async exec(msg, args) {

		if (!msg.member.roles.cache.has('784654682316079104')) return msg.reply('You cannot use this command!');

		msg.guild.channels.cache.get(args.channel.id).send(args.text);

	}
}

module.exports = SayCommand;
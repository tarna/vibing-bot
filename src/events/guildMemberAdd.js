const { Listener } = require('discord-akairo');

class GuildMemberAddListener extends Listener {
	constructor() {
		super('guildMemberAdd', {
			emitter: 'client',
			event: 'guildMemberAdd'
		});
	}

	exec(member) {
		console.log(`${member.tag} Joined ${member.guild.name}`);

		this.client.channels.cache.get('784634075439955988').send(`ｗｅｌｃｏｍｅ　ｔｏ　ｔｈｅ　ｖｉｂｅ　ｌｏｕｎｇｅ，　<@${member.id}>！`);

		let name = member.user.username
		member.setNickname(name.toLowerCase())

	}
}

module.exports = GuildMemberAddListener;
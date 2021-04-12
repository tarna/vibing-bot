const { Listener } = require('discord-akairo');

class guildMemberUpdateListener extends Listener {
    constructor() {
        super('guildMemberUpdate', {
            emitter: 'client',
            event: 'guildMemberUpdate'
        });
    }

    exec(oldMember, newMember) {
        if (oldMember.user.username != newMember.user.username) {
		    newMember.setNickname(newMember.user.username.toLowerCase())
        }
    }
}

module.exports = guildMemberUpdateListener;
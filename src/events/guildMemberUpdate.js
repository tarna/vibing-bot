const { Listener } = require('discord-akairo');

class guildMemberUpdateListener extends Listener {
    constructor() {
        super('guildMemberUpdate', {
            emitter: 'client',
            event: 'guildMemberUpdate'
        });
    }

    exec(newMember) {
        if (newMember.displayName.toLowerCase() != newMember.displayName) {
            try {
                newMember.setNickname(newMember.displayName.toLowerCase())
            } catch(error) {
                console.log(`Couldn't lowercase the username of: ${newMember.tag}`)
            }
        }
    }
}

module.exports = guildMemberUpdateListener;

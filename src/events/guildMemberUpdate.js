const { Listener } = require('discord-akairo');

class guildMemberUpdateListener extends Listener {
    constructor() {
        super('guildMemberUpdate', {
            emitter: 'client',
            event: 'guildMemberUpdate'
        });
    }

    exec(oldMember, newMember) {
        if (oldMember.displayName.toLowerCase() != newMember.displayName.toLowerCase()) {
            try {
                newMember.setNickname(newMember.displayName.toLowerCase())
            } catch(error) {
                console.log(`Couldn't lowercase the username of: ${newMember.tag}`)
            }
        }
    }
}

module.exports = guildMemberUpdateListener;

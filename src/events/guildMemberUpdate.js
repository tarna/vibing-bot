const { Listener } = require('discord-akairo');
const { toLower } = require('lodash');

class guildMemberUpdateListener extends Listener {
    constructor() {
        super('guildMemberUpdate', {
            emitter: 'client',
            event: 'guildMemberUpdate'
        });
    }

    exec(oldMember, newMember) {
        if (toLower(oldMember.displayName) != toLower(newMember.displayName)) {
            try {
		        newMember.setNickname(newMember.displayName.toLowerCase())
            } catch(error) {
                console.log(`Couldn't lowercase the username of: ${newMember.tag}`)
            }
        }
    }
}

module.exports = guildMemberUpdateListener;
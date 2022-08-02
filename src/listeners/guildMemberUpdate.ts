import { Listener } from '@sapphire/framework';
import type { GuildMember } from 'discord.js';

export class GuildMemberAddListener extends Listener {
    constructor(context: Listener.Context, options: Listener.Options) {
        super(context, {
            ...options,
            event: 'guildMemberUpdate'
        });
    }

    run(oldMember: GuildMember, newMember: GuildMember) {
        if(oldMember.displayName.toLowerCase() != newMember.displayName.toLowerCase()) {
            try {
                newMember.setNickname(newMember.displayName.toLowerCase());
            }catch(e) {
                this.container.logger.error(`Couldn't lowercase the username of: ${newMember.user.tag}`);
            }
        }
    }
}
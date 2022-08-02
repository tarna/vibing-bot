import { Listener } from '@sapphire/framework';
import type { GuildMember, TextChannel } from 'discord.js';
import { config } from '../config';

export class GuildMemberAddListener extends Listener {
    constructor(context: Listener.Context, options: Listener.Options) {
        super(context, {
            ...options,
            event: 'guildMemberAdd'
        });
    }

    run(member: GuildMember) {
        const welcomeChannel = member.guild.channels.cache.get(config.welcomeChannel) as TextChannel;
        welcomeChannel.send(`ｗｅｌｃｏｍｅ　ｔｏ　ｔｈｅ　ｖｉｂｅ　ｌｏｕｎｇｅ，　<@${member.id}>！`);
        member.setNickname(member.user.username.toLowerCase());
    }
}
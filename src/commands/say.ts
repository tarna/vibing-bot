import { ChatInputCommand, Command, RegisterBehavior } from '@sapphire/framework';
import { GuildMember, MessageEmbed, TextChannel } from 'discord.js';
import { config } from '../config';

export class SayCommand extends Command {
    constructor(context: Command.Context, options: Command.Options) {
        super(context, {
            ...options,
            name: 'say',
            description: 'Make the bot say something.',
        });
    }

    registerApplicationCommands(registry: ChatInputCommand.Registry) {
        registry.registerChatInputCommand(builder => 
            builder.setName('say').setDescription('Make the bot say something.')
                .addChannelOption(option => option.setName('channel').setRequired(true).setDescription('The channel to say the message in.'))
                .addStringOption(option => option.setName('message').setRequired(true).setDescription('The message to say.')),
                { behaviorWhenNotIdentical: RegisterBehavior.Overwrite}
        );
    }

    async chatInputRun(interaction: Command.ChatInputInteraction) {
        if(!interaction.guild) return;
        const member = interaction.member as GuildMember;
        const canUse = member.roles.cache.some(r=> config.modRoles.includes(r.name));
        if(!canUse) return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
 
        const channelId = interaction.options.get('channel')?.value as string;
        const channel = interaction.guild?.channels.cache.get(channelId) as TextChannel;
        const message = interaction.options.get('message')?.value as string;
        
        channel.sendTyping();
        const embed = new MessageEmbed()
            .setTitle('Message sent!')
            .setColor('GREEN')
            .addField('Channel', `<#${channel}>`)
            .addField('Message', message);
        setTimeout(() => {
            channel.send(message);
            interaction.reply({ embeds: [embed], ephemeral: true });
        }, 1000);
    }
}
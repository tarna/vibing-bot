import { ChatInputCommand, Command, RegisterBehavior } from '@sapphire/framework';
import {  MessageEmbed } from 'discord.js';

export class ServerInfoCommand extends Command {
    constructor(context: Command.Context, options: Command.Options) {
        super(context, {
            ...options,
            name: 'serverinfo',
            description: 'Get information about the server.',
        });
    }

    registerApplicationCommands(registry: ChatInputCommand.Registry) {
        registry.registerChatInputCommand(builder => 
            builder.setName('serverinfo').setDescription('Get information about the server.'),
                { behaviorWhenNotIdentical: RegisterBehavior.Overwrite}
        );
    }

    async chatInputRun(interaction: Command.ChatInputInteraction) {
        const guild = interaction.guild;
        if(!guild) return interaction.reply('This command can only be used in a server.');

        const integrations = await guild.fetchIntegrations();
        const botSize = integrations.filter(i => i.application?.bot?.bot === true).size;

        const embed = new MessageEmbed()
			.setTitle(guild.name)
			.setColor('#0000FF')
			.addField(
                'Server Info', `Owner: <@${guild.ownerId}> Created: <t:${Math.round(guild.createdTimestamp / 1000)}:R> 
                Members: ${guild.memberCount} \nBots: ${botSize}`
            )
		return interaction.reply({ embeds: [embed], ephemeral: true });
    }
}
import { PrismaClient } from '@prisma/client';
import { ChatInputCommand, Command, RegisterBehavior } from '@sapphire/framework';
import { randomBytes } from 'crypto';
import { MessageEmbed } from 'discord.js';
import ms from 'ms';

const prisma = new PrismaClient();

export class RemindMeCommand extends Command {
    constructor(context: Command.Context, options: Command.Options) {
        super(context, {
            ...options,
            name: 'remindme',
            description: 'Reminds you of something in the future.',
        });
    }

    registerApplicationCommands(registry: ChatInputCommand.Registry) {
        registry.registerChatInputCommand(builder => 
            builder.setName('remindme').setDescription('Reminds you of something in the future.')
                .addStringOption(option => option.setName('time').setRequired(true).setDescription('In how long do you want to be reminded?'))
                .addStringOption(option => option.setName('message').setRequired(true).setDescription('The message to be reminded of')),
                { behaviorWhenNotIdentical: RegisterBehavior.Overwrite}
        );
    }

    async chatInputRun(interaction: Command.ChatInputInteraction) {
        const reminder = interaction.options.get('message')?.value as string;
        const id = randomBytes(4).toString('hex');
        const time = ms(interaction.options.get('time')?.value as string);
        const data = await prisma.reminder.create({
            data: {
                id,
                userId: interaction.user.id,
                reminder,
                remindedTime: new Date(Date.now() + time),
            }
        });
        const embed = new MessageEmbed()
            .setColor('GREEN')
            .setTitle('Reminder created!')
            .addField('ID', data.id)
            .addField('Reminder', data.reminder)
            .setFooter({
                text: interaction.user.tag,
                iconURL: interaction.user.displayAvatarURL(),
            })
            .setTimestamp();

        interaction.reply({ embeds: [embed], ephemeral: true });
    }
}
import { PrismaClient } from '@prisma/client';
import { ChatInputCommand, Command, RegisterBehavior } from '@sapphire/framework';
import { MessageEmbed } from 'discord.js';

const prisma = new PrismaClient();

export class RemindersCommand extends Command {
    constructor(context: Command.Context, options: Command.Options) {
        super(context, {
            ...options,
            name: 'reminders',
            description: 'Get your reminders',
        });
    }

    registerApplicationCommands(registry: ChatInputCommand.Registry) {
        registry.registerChatInputCommand(builder => 
            builder.setName('reminders').setDescription('Get your reminders'),
                { behaviorWhenNotIdentical: RegisterBehavior.Overwrite}
        );
    }

    async chatInputRun(interaction: Command.ChatInputInteraction) {
        const reminders = await prisma.reminder.findMany({
            where: {
                active: true,
                userId: interaction.user.id,
            }
        });
        const embed = new MessageEmbed()
            .setTitle('Your Reminders')
            .setColor('GREEN')
            .setDescription(reminders.map(reminder => `ID: ${reminder.id} \n Reminder: ${reminder.reminder}`).join('\n'));
        interaction.reply({ embeds: [embed], ephemeral: true });
    }
}
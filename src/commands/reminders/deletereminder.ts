import { PrismaClient } from '@prisma/client';
import { ChatInputCommand, Command, RegisterBehavior } from '@sapphire/framework';

const prisma = new PrismaClient();

export class DeleteReminderCommand extends Command {
    constructor(context: Command.Context, options: Command.Options) {
        super(context, {
            ...options,
            name: 'deletereminder',
            description: 'Delete a reminder',
        });
    }

    async registerApplicationCommands(registry: ChatInputCommand.Registry) {
        registry.registerChatInputCommand(builder => 
            builder.setName('deletereminder').setDescription('Delete a reminder')
                .addStringOption(option => option.setName('id').setRequired(true).setDescription('The ID of the reminder to delete.')),
                { behaviorWhenNotIdentical: RegisterBehavior.Overwrite}
        );
    }

    async chatInputRun(interaction: Command.ChatInputInteraction): Promise<any> {
        const id = interaction.options.get('id')?.value as string;
        const reminder = await prisma.reminder.findFirst({
            where: {
                id,
                userId: interaction.user.id,
            }
        });
        if (!reminder) return interaction.reply({ content: `You do not have a reminder with id \`${id}\``, ephemeral: true });
        
        await prisma.reminder.delete({
            where: {
                id: reminder.id,
            }
        });
        interaction.reply({ content: `Reminder with id \`${id}\` has been deleted.`, ephemeral: true });
    }
}
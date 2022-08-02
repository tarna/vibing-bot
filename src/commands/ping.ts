import { isMessageInstance } from '@sapphire/discord.js-utilities';
import { ChatInputCommand, Command, RegisterBehavior } from '@sapphire/framework';

export class PingCommand extends Command {
    constructor(context: Command.Context, options: Command.Options) {
        super(context, {
            ...options,
            name: 'ping',
            description: 'Pong!',
        });
    }

    registerApplicationCommands(registry: ChatInputCommand.Registry) {
        registry.registerChatInputCommand(builder => 
            builder.setName('ping').setDescription('Get the bot\'s ping'),
                { behaviorWhenNotIdentical: RegisterBehavior.Overwrite}
        );
    }

    async chatInputRun(interaction: Command.ChatInputInteraction): Promise<any> {
        const msg = await interaction.reply({ content: `Ping?`, ephemeral: true, fetchReply: true });
        // @ts-ignore
        if (isMessageInstance(msg)) {
            const diff = msg.createdTimestamp - interaction.createdTimestamp;
            const ping = Math.round(this.container.client.ws.ping);
            return interaction.editReply(`Pong 🏓! (Round trip took: ${diff}ms. Heartbeat: ${ping}ms.)`);
        }
        return interaction.editReply('Failed to retrieve ping :(');
    }
}
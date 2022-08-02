import { PrismaClient } from '@prisma/client';
import { Listener } from '@sapphire/framework';
import { Client, MessageEmbed } from 'discord.js';
import { convertToUnix } from '../util/functions';

const prisma = new PrismaClient();

export class ReadyListener extends Listener {
    constructor(context: Listener.Context, options: Listener.Options) {
        super(context, {
            ...options,
            once: true,
            event: 'ready'
        });
    }

    run(client: Client) {
        const { tag, id } = client.user!;
        this.container.logger.info(`Successfully logged in as ${tag} (${id})`);

        setInterval(async () => {
            const reminders = await prisma.reminder.findMany({
                where: {
                    active: true,
                }
            });
            reminders.forEach(async reminder => {
                const unix = Math.floor(reminder.remindedTime.getTime());
                if(Date.now() >= unix) {
                    await prisma.reminder.delete({
                        where: {
                            id: reminder.id,
                        }
                    });
                    try {
                        const user = this.container.client.users.cache.get(reminder.userId);
                        const embed = new MessageEmbed()
                            .setTitle('💥 Reminder')
                            .setColor('GREEN')
                            .addField('ID', reminder.id)
                            .addField('Created At', `<t:${convertToUnix(reminder.createdAt)}> (<t:${convertToUnix(reminder.createdAt)}:R>)`)
                            .addField('Reminder', reminder.reminder);
                        user?.send({ embeds: [embed] });
                    }catch(e) {
                        this.container.logger.error(`Uh oh! User with ID: ${reminder.userId} could not be found...`)
                    }
                }
            });
        }, 1000);
    }
}
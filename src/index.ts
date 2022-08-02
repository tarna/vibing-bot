import { SapphireClient } from '@sapphire/framework';
import '@sapphire/plugin-logger/register';
require('dotenv').config();

const client = new SapphireClient({
    intents: [
        'GUILDS',
        'GUILD_MESSAGES',
        'DIRECT_MESSAGES',
        'GUILD_MEMBERS',
        'GUILD_MESSAGE_REACTIONS',
        'DIRECT_MESSAGE_REACTIONS',
        'GUILD_MESSAGES',
        'DIRECT_MESSAGES'
    ]
});

client.login(process.env.DISCORD_TOKEN);
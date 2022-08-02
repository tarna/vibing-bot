export const config: BotConfig = {
    welcomeChannel: process.env.WELCOME_CHANNEL!,
    modRoles: [
        'untreated',
        'cute',
    ]
}

export interface BotConfig {
    welcomeChannel: string;
    modRoles: string[];
}
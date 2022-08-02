export const config: BotConfig = {
    welcomeChannel: process.env.WELCOME_CHANNEL!,
}

export interface BotConfig {
    welcomeChannel: string;
}
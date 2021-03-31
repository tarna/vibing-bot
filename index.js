const { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler } = require('discord-akairo');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.mongo || '', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}).then(() => {
	console.log('connected to db')
})

class DiscordBot extends AkairoClient {
	constructor() {
		super({
			ownerID: '342418113410629632',
		}, {
			disableMentions: 'everyone'
		});

		this.commandHandler = new CommandHandler(this, {
			directory: './src/commands/',
			prefix: '+',
			handleEdits: true,
    	commandUtil: true
		});

		this.inhibitorHandler = new InhibitorHandler(this, {
			directory: './src/inhibitors/'
		});

		this.listenerHandler = new ListenerHandler(this, {
			directory: './src/events/'
		});

		this.listenerHandler.setEmitters({
    	commandHandler: this.commandHandler,
    	inhibitorHandler: this.inhibitorHandler,
    	listenerHandler: this.listenerHandler
		});

		this.commandHandler.loadAll();

		this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
		this.inhibitorHandler.loadAll();

		this.commandHandler.useListenerHandler(this.listenerHandler);
		this.listenerHandler.loadAll();

	}
}

const client = new DiscordBot();
client.login(process.env.token);

const { Listener } = require('discord-akairo');
const ms = require('ms');

class MessageListener extends Listener {
	constructor() {
		super('message', {
			emitter: 'client',
			event: 'message'
		});
	}

	exec(msg) {

		if(msg.channel.id != '773796014456176710') return;

		const filter = r => {
			if(r.channel.id = msg.channel.id) return true
		}

		const array = ['hey', 'hi', 'hello', 'how are you guys doing', 'what\'s up', 'how\'s everyone\'s day going', 'i love you all', 'ily', 'ur amazing', 'you\'re loved', 'i love talking to you guys', 'what\'s everyone doing', 'how\'s it going'];

		const random = array[Math.floor(Math.random()*array.length)];
		const randomTime = getRndInteger(ms('1h'), ms('2h'))
		
		msg.channel.awaitMessages(filter, { max: 1, time: randomTime, errors: ['time'] })
			.then(c => {

			})
			.catch(c => {
				msg.channel.send(random);
			})

	}
}

module.exports = MessageListener;

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}
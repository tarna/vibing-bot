const mongoose = require('mongoose');

const remindSchmea = new mongoose.Schema({
	userId: String,
	time: Date,
	reminder: String,
	active: Boolean
})

const Remind = mongoose.model('remind', remindSchmea)

module.exports = { Remind }
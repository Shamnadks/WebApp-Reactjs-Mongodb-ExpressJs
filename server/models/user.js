const mongoose = require('mongoose')
const User = new mongoose.Schema(
	{
		username: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		quote: { type: String },
		image:{type:String}
        // username:String,
		// email: String,
		// password:String
		
	},
	{ collection: 'user-data' }
)

const model = mongoose.model('UserData', User)

module.exports = model



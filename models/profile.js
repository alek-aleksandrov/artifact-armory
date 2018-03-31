var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var	profileSchema = mongoose.Schema({
	
	user: {type: Schema.Types.ObjectId, ref: 'User'},
	image: {type: String, default: 'https://i.imgur.com/L9OqGTz.jpg'},
	bio: {type: String, default: 'Add your bio!'},
	lastUpdated: {type: Date, default: Date.now}

}, );

module.exports = mongoose.model('Profile', profileSchema);
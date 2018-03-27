var mongoose = require('mongoose');

var	profileSchema = mongoose.Schema({
	
	profileImage: String,
	profileBio: String,
	twitchUrl: String

});

module.exports = mongoose.model('Profile', profileSchema);
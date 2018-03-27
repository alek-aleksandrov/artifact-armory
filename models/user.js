var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var secret = process.env.SECRET_KEY;

var	userSchema =  mongoose.Schema({
	
	local: {
		username: String,
		email: String,
		password: String
	}
});

//generate a hash
userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}
//pasword validation
userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.local.password);
}

module.exports = mongoose.model('User', userSchema);
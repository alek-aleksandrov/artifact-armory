var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var	userSchema = new Schema( {
		username: String,
		password: String,
		email: String,
		//createdDate: {type: Date, required: true},
		//lastLoggedIn: {type: String, required: true, max: 8},
		//userRole: {type: String, required: true, max: 15}
		//admin: for posting articles user: for evrything else
	});

userSchema.virtual('url').get(function () {
  return '/user/' + this._id;
});
var User = mongoose.model('User', userSchema);
module.exports = User;
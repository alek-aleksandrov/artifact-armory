var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var profileSchema = new Schema({
	first_name: String,
	last_name: String,
	biography: String,
	membership: String,
	article:[
      {type: Schema.Types.ObjectId, ref: 'Articles'}
    ]
    // decks:[
    //   {type: Schema.Types.ObjectId, ref: 'Decks'}
    // ]
});

var Profile = mongoose.model('Profile', userSchema);
module.exports = Profile;
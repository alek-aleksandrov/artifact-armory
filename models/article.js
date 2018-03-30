var mongoose = require('mongoose');

var	articleSchema =  mongoose.Schema({
	title: String,
	author: String,
	banner: String,
	body: String,
	excerpt: String,
	categories: [String],
	created: {
		    type : Date,
		    default : Date.now
	}
});

module.exports = mongoose.model('Article', articleSchema);
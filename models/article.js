var mongoose = require('mongoose');

var	articleSchema =  mongoose.Schema({
	title: String,
	author: String,
	body: String,
	date: Date,
	categories: [String]
});

module.exports = mongoose.model('Article', articleSchema);
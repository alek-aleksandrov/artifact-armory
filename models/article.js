var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var articleSchema = new Schema({
	title: String,
	body: String,
	createdDate: Date,
	category: Array,
});

var Article = mongoose.model('Article', userSchema);
module.exports = Article;
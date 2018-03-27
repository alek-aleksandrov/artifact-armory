var express = require('express');
var Article = require('../models/article');
var router = express.Router();

//var arts = [
//	{'id' : 0, 'title' : 'Article A', 'author' : 'author A', 'body' : 'Alek likes men', 'date' : '1-12-2020', 'categories' : ['alek', 'gay']},
//	{'id' : 1, 'title' : 'Article B', 'author' : 'author B', 'body' : 'Alek likes men', 'date' : '1-12-2020', 'categories' : ['alek', 'gay']},
//	{'id' : 2, 'title' : 'Article C', 'author' : 'author C', 'body' : 'Alek likes men', 'date' : '1-12-2020', 'categories' : ['alek', 'gay']}
//];

router.get('/', function(req, res, next) {
	var arts;
	Article.find({}, function(err, results) {
		console.log(results);
		res.render('articles', { title: 'Articles', articles: results});
	});
});

router.get('/*', function(req, res, next) {
	var id = req.query.id;
	var art = arts[id];
	
	res.render('article', { title: art.title, article: art});
});

module.exports = router;
var express = require('express');
var Article = require('../models/article');
var router = express.Router();

//var arts = [
//	{'id' : 0, 'title' : 'Article A', 'author' : 'author A', 'body' : 'Alek likes men', 'date' : '1-12-2020', 'categories' : ['alek', 'gay']},
//	{'id' : 1, 'title' : 'Article B', 'author' : 'author B', 'body' : 'Alek likes men', 'date' : '1-12-2020', 'categories' : ['alek', 'gay']},
//	{'id' : 2, 'title' : 'Article C', 'author' : 'author C', 'body' : 'Alek likes men', 'date' : '1-12-2020', 'categories' : ['alek', 'gay']}
//];

router.get('/', function(req, res, next) {
	var id = req.query.id;

	if(id == null)
	{
		Article.find({}, "title excerpt", function(err, results) {
			if(err)
				throw err;
			res.render('articles', { title: 'Articles', articles: results});
		});
	}
	else{
		Article.findOne({'_id': id}, function(err, result){
			console.log(result);
			if(err)
				throw err;
			res.render('article', { title: result.title, article: result});
		});
	}
});

router.get('/newarticle', function(req, res, next){
	res.render('newarticle');
});

// router.get('/*', function(req, res, next) {
// 	var id = req.query.id;

// 	Article.findOne({'id' : id}, function(err, result) {
// 		if(err)
// 			throw err;
// 		res.render('article', { title: result.title, article: result});
// 	});
// });

module.exports = router;
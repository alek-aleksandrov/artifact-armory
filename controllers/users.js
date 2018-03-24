var mongoose = require('mongoose')
var Video = require('../models/user');
module.exports.controller = function(app) {

	//home page modal
	app.get('/signup', function(req, res) {
		//logic
		res.render('/')
	});

}
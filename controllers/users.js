var mongoose = require('mongoose')
var User = require('../models/user');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// home page modal
// app.get('/sign-up', function(req, res) {
// 	//logic
// 	res.render('/')
// });

// exports.create_user = function(req, res) {
	
// 	var datetime = new Date();
// 	var hello = new User(
// 		{name: 'Hello',
// 		email: 'bgalek78@gmail.com',
// 		password: 'Bgrazgrad0',
// 		//createdDate: datetime
// 		}
// 	);
// 	hello.save(function(err) {
// 		if (err) return handleError(err);
// 	});
// 	res.redirect('/');
// }



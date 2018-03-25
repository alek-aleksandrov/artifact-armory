var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var User = mongoose.model('User');
var auth = require('../routes/auth');
var bodyParser = require('body-parser');

var index_controller = require('../controllers/index.js');
var users_controller = require('../controllers/users.js');

// router.get('/', function(req, res) {
//   res.render('index', { title: 'Artifact Armory' });
// });

router.use('/', require('./users'));

// router.post('/users', function(req, res, next){
// 	var user = new User();

// 	user.username = req.body.user.username;
// 	user.email = req.body.user.email;
// 	user.setPassword(req.body.user.password);

// 	user.save().then(function(){
// 		return res.json({user: user.toAuthJSON()});
// 	}).catch(next);
// });

router.use(function(err, req, res, next){
	if(err.name === 'ValidationError'){
		return res.status(422).json({
			errors: Object.keys(err.errors).reduce(function(errors, key){
		    	errors[key] = err.errors[key].message;
		    	return errors;
			}, {})
		});
	}
	return next(err);
});

module.exports = router;
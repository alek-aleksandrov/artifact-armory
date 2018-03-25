var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var User = mongoose.model('User');
var auth = require('../routes/auth');
// Require controllers
var index_controller = require('../controllers/index.js');
var users_controller = require('../controllers/users.js');

router.post('/users', function(req, res, next){
	var user = new User();
	user.username = req.body.username;
	user.email = req.body.email;
	user.setPassword(req.body.password);

	user.save().then(function(){
		return res.redirect('/');	//res.json({user: user.toAuthJSON()});
	}).catch(next);
});


router.post('/users/login', function(req, res, next){
	if (!req.body.user.email) {
		return res.status(422).json({errors: {email: "can't be blank"}});
	}

	if (!req.body.user.password) {
		return res.status(422).json({errors: {password: "can't be blank"}});
	}

	passport.authenticate('local', {session: false}, function(err, user, info){
		if (err) { return next(err); }
		console.log('hello')
		if (user) {
			console.log('user');
			user.token = user.generateJWT();
			return res.json({user: user.toAuthJSON()});//res.redirect('/');
		} 
		else {
			console.log('nope');
			return res.status(422).json(info);
		}
	})(req, res, next);
});

router.get('/user', auth.required, function(req, res, next){
	User.findById(req.payload.id).then(function(user){
		if(!user){ return res.sendStatus(401); }

		// only update fields that were actually passed...
	    if(typeof req.body.user.username !== 'undefined'){
	      user.username = req.body.username;
	    }
	    if(typeof req.body.user.email !== 'undefined'){
	      user.email = req.body.email;
	    }
	    if(typeof req.body.user.password !== 'undefined'){
	      user.setPassword(req.body.password);
	    }

	    return user.save().then(function () {
	    	return res.json({user: user.toAuthJSON()});
	    })
	}).catch(next);
});

//user profile router

module.exports = router;
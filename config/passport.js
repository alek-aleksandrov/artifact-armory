var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = function(passport) {

	//session set up
	//required for persistent login sessions
	//passport needs to serialize and deserialize users o/o session

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	//local signup
	//two strategies: one for login one for signup

	passport.use('local-signup', new LocalStrategy({
		//local uses uname and password, we will override with email and password
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true // passes entire request to callback function
	},
	function(req, email, password, done) {
		//async
		//User.findOne wont fire unless data is sent back
		process.nextTick(function() {
			//find a user whose email is the same as forms email
			//we are checking to see if user exists

		User.findOne({ 'local.email': email }, function(err, user) {
			if (err)
				return done(err);

			//check user for dupe
			if (user) {
				return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
			} else {
				// if all above conditions are false
				var newUser = new User();

				// set the local credentials
				newUser.local.email = email;
				newUser.local.password = newUser.generateHash(password);

				// save the user 
				newUser.save(function(err) {
					if (err)
						throw err;
					return done(null, newUser);
             });
            }

        });    

        });

    }));

    passport.use('local-login', new LocalStrategy({
    	usernameField: 'email',
    	password: 'password',
    	passReqToCallback: true
    },
    function(req, email, password, done) { // callback with email and password

    	User.findOne({ 'local.email': email}, function(err, user) {
    		if (err)
    			return done(err);

    		if (!user)
    			return done(null, false, req.flash('loginMessage', 'No user found.'));

    		if (!user.validPassword(password))
    			return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
    		
    		return done(null, user);
    	});
    }));
};

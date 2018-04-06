var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var Profile = require('../models/profile');

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
				
				User.findOne({ 'local.username': req.body.username }, function(err, user) {
					var regcheck = new RegExp("^[a-zA-Z0-9_-]*$");
					if (err)
						return done(err);
					if (user) {
						return done(null, false, req.flash('signupMessage', 'That username is already taken, try another one.'));
					}
					else if (!(regcheck.test(req.body.username))) {
						console.log(regcheck.test(req.body.username));
						return done(null, false, req.flash('signupMessage', 'User name can only contain A-Z, 0-9, and - or _.'));
					} else {
						// set the local credentials
						var newUser = new User();
						newUser.local.username = req.body.username;
						newUser.local.email = email;
						newUser.local.password = newUser.generateHash(password);
						console.log(newUser);
						// save the user 
						newUser.save(function(err) {
							if (err) throw err;

							var newProfile = new Profile();
							newProfile.user = newUser._id;

							newProfile.save(function(err) {
								if (err) throw err;
							});

							return done(null, newUser);

		             	});
					}
				})
				
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

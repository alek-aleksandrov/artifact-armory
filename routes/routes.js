var User = require('../models/user');
var Profile = require('../models/profile');
var profileController = require('../controllers/profileController');
module.exports = function(app, passport) {
	
	// home
	app.get('/', function(req, res) {
		if (req.user) {
			res.locals.user = req.user;
		}
		res.render('index');
	});

	app.get('/not-found', isLoggedInSafe, function(req, res) {
		res.render('not-found');
	});

	//login
	app.get('/login', function(req, res) {
		// render the page and pass flash info
		if (req.user) {
			res.locals.user = req.user;
		}
		res.render('login', { message: req.flash('loginMessage') });
	});

	//process login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true
	}));

	app.get('/signup', function(req, res) {
		//render and send flash
		if (req.user) {
			res.redirect('/profile');
		}
		res.render('signup', { message: req.flash('signupMessage') })
	});

	//process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/profile', //secure profile session
		failureRedirect: '/signup', //redirect to signup page if error
		failureFlash: true //allow flash messages
	}));

	//profile
	app.get('/profile', function(req, res) {
		var userid = req.user.local.username;
		res.redirect('/profile/'+userid);
	});

	//Probably should clean this up
	app.get('/profile/:id', isAuthenticatedProfile, function(req, res) {
		var username = req.params.id;
		var user = getUserByUsername(username, function(err, user) {
			if (err) return next(err);
			if (user) {
				console.log(user._id);
				var profile = getProfileByUsernameId(user._id, function(err, profile) {
					if (err) return next(err);
					if (profile) {
						res.render('profile', {
							username : user.local.username, // change for security reasons
							profile: profile
						});
					}
					else {
						res.redirect('/not-found');
					}
				});
			}
			else {res.redirect('/not-found');}
		});
	});

	app.get('/profile/:id/edit', isLoggedIn, function(req, res) {
		res.render('edit');
	});

	// post edited info page
	//app.post('/profile/:id/edit', profileController.updateProfile(req, res));


	// Potential error handler specifically for production
	// app.use(function(err, req, res, next) {
	//   res.status(err.status || 500);
	//   res.render('error', {
	//     message: err.message,
	//     error: {}
	//   });
	// });

	//logout
	app.get('/logout', function(req,res) {
		req.logout();
		res.redirect('/');
	});

};

//route middleware to make sure user is logged in

function isLoggedIn(req, res, next) {

	// if user is authenticated in session
	if (req.isAuthenticated()) {
		res.locals.user = req.user.local.username;
		return next();
	}

	res.redirect('/');
}
function isLoggedInSafe(req, res, next) {

	// if user is authenticated in session
	if (req.isAuthenticated()) {
		res.locals.user = req.user.local.username;
		return next();
	}
	else {return next();}
}
function isAuthenticatedProfile(req, res, next) {
	if (req.isAuthenticated()) {
		if (req.user.local.username === req.params.id) {
			res.locals.ownProfile = true;
		}
		res.locals.user = req.user.local.username;
		return next();
		}
	else {
		res.locals.ownProfile = false;
		return next();
	}
}
function getUserByUsername(username, done) {
	User.findOne({'local.username': username}, function(err, user) {
		if (err) {
			return done(err);
		}
		if (user) {
			return done(null, user);
		}
		else {
			return done(null);
		}
	});
}
function getProfileByUsernameId(profile, done) {
	Profile.findOne({'user': profile}, function(err, profile) {
		if (err) {
			return done(err);
		}
		if (profile) {
			return done(null, profile);
		}
		else {
			return done(null);
		}
	});
}

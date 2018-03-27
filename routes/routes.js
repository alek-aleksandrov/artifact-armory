module.exports = function(app, passport) {
	
	// home
	app.get('/', function(req, res) {
		if (req.user) {
			res.locals.user = req.user;
		}
		res.render('index');
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
	app.get('/profile', isLoggedIn, function(req, res) {
		var userid = req.user.local.username;
		res.redirect('/profile/'+userid);
	});

	app.get('/profile/:id', function(req, res) {
		res.render('profile', {
			user : req.user // will have to write a middleware that gets the profile by usrname since its unique
		});
	});

	// create profile edit info page
	// app.get('/profile/:id/edit', isLoggedIn, function(req, res) {});

	// post edited info page
	// app.post('/profile/:id/edit', isLoggedIn, function(req,res) {});

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
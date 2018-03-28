module.exports = function(app, passport) {
	
	// home
	app.get('/', function(req, res) {
		res.render('index');
	});

	//login
	app.get('/login', function(req, res) {
		// render the page and pass flash info
		res.render('login', { message: req.flash('loginMessage') });
	});
	
	app.get('/newarticle', function(req, res) {
		res.render('newarticle', { message: req.flash('responseMessage') });
	});
	
	app.post('/newarticle', function(req, res) {
		var title = req.body.title,
			body = req.body.body,
			excerpt = req.body.excerpt,
			banner = req.body.banner;
		console.log(req.body);
		//check if data exists
		if(title == null || body == null || excerpt == null || banner == null)
		{
			req.flash('responseMessage', 'gay');
			res.redirect('/newarticle');
		}
		
		//check if data is empty
		if(title == "" || body == "" || excerpt == "" || banner == "")
		{
			req.flash('responseMessage', 'gayer');
			res.redirect('/newarticle');
		}
	});

	//process login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true
	}));

	app.get('/signup', function(req, res) {
		//render and send flash
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
		res.render('profile', {
			user : req.user // get user out of session
		})
	});

	//logout
	app.get('/logout', function(req,res) {
		res.logout();
		res.redirect('/');
	});

};

//route middleware to make sure user is logged in

function isLoggedIn(req, res, next) {

	// if user is authenticated in session
	if (req.isAuthenticated()) {
		return next();
	}

	req.flash('loginMessage', 'login mf');
	res.redirect('/login');
}
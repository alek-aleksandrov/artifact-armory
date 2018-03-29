const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.profileUpdate = function(req, res) {
	
	//validate fields
	//sanitize fields

	//sanitizeBody('profile_picture').trim().escape(),
	sanitizeBody('profile_bio').trim().escape(),
	sanitizeBody('twitch_url').trim().escape()

	var profile = new Profile({
		image: "https://i.imgur.com/L9OqGTz.jpg",
		profile_bio: req.body.profile_bio,
		twitch_url: req.body.twitch_url,
		user: req.user._id
	});
	
	if (!errors.isEmpty()) {
		// no errors to show, but would be rendered back as messages
	}
	else {
		Profile.findByIdAndUpdate(req.user.profile, profile, {}, function (err, profile) {
			if (err) { return next(err); }
			res.redirect('/profile');
		});
	}
	
};
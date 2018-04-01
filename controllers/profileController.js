const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
var Profile = require('../models/profile');  

exports.profileUpdate = [ 

	sanitizeBody('profile_bio').trim().escape(),

	(req, res, done) => {
	
	//validate fields
	//sanitize fields

	//sanitizeBody('profile_picture').trim().escape(),


		const errors = validationResult(req);

		Profile.findOne({user: req.user._id}, function(err, profileid) {
			if (err) { return done(err); }
			if (profileid) {
				Profile.findByIdAndUpdate(profileid._id, {$set:{bio:req.body.profile_bio}}, {new: true}, function (err, theprofile) {
					if (err) { return next(err); }
					res.redirect('/profile');
				});
			}
		});
	}	
];
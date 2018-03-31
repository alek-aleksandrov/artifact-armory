const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
var Profile = require('../models/profile');
var AWS = require('aws-sdk');
var multer = require('multer');
var multerS3 = require('multer-s3');
var s3 = new AWS.S3();
AWS.config.loadFromPath('./config.json');

exports.profileUpdate = [ 

	sanitizeBody('profile_bio').trim().escape(),

	(req, res, done) => {
	
	//validate fields
	//sanitize fields

	//sanitizeBody('profile_picture').trim().escape(),


		const errors = validationResult(req);

		// var newprofile = new Profile({
		// 	image: "https://i.imgur.com/L9OqGTz.jpg",
		// 	profile_bio: req.body.profile_bio,
		// 	user: req.user._id
		// });
		var checkImageExtension = req.body.profile_picture;
		checkImageExtension = checkImageExtension.split('').reverse();
		checkImageExtensionIndex = checkImageExtension.indexOf('.');
		var fileExtension = [];
		for (var i = 0; i < checkImageExtensionIndex+1; i++) {
			fileExtension.push(checkImageExtension[i]);
		}
		fileExtension = fileExtension.reverse().join('');
		fileExtension = fileExtension.toLowerCase();


		if (fileExtension == ".jpg" || fileExtension == ".png" || fileExtension == ".jpeg") {
			var item = req.body.profile_picture;
			Profile.findOne({user: req.user._id}, function(err, profileid) {
				if (err) { return done(err); }
				if (profileid) {
					Profile.findByIdAndUpdate(profileid._id, {$set:{image:req.body.profile_bio, bio:req.body.profile_bio}}, {new: true}, function (err, theprofile) {
						if (err) { return next(err); }
						res.redirect('/profile');
					});
				}
			});
			
		}
		else {
			console.log("Didn't work!");
			req.flash('profileEditMessage', 'File extension must be either .JPG, .PNG, or .JPEG.');
			res.redirect('/profile/'+ req.user.local.username +'/edit');
				
		}
	}
	
];
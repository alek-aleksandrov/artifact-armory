var express = require('express');
var router = express.Router();

router.get('/sign-up', function(req, res, next) {
	res.render('/');
})

module.exports = router;
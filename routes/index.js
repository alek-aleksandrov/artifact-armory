var express = require('express');
var router = express.Router();

var index_controller = require('../controllers/index.js');
var users_controller = require('../controllers/users.js');

router.get('/', function(req, res) {
  res.render('index', { title: 'Artifact Armory' });
});

router.post('/sign-up', users_controller.create_user);

module.exports = router;
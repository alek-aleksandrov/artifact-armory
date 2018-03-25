var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var User = mongoose.model('User');
var auth = require('../routes/auth');
var bodyParser = require('body-parser');

//router.use('/login', require('./login'));

module.exports = router;
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

// Mongo Setup

var mongoose = require('mongoose');
var mongoDB = process.env.MONGODB;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//routes

require('./models/user');
require('./config/passport');
var index = require('./routes/index');
app.use('/', index);
var users = require('./routes/users');
app.use('/users', users);
var login = require('./routes/login');
app.use('/login', login);

var route;

// views is directory for all template files

app.set('port', (process.env.PORT || 5000));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// app.use(function(req, res, next) {
// 	var err = new Error('Not Found');
// 	err.status = 404;
// 	next(err);
// });

// Top level page serve

app.get('/', function(req, res) {
  	res.render('index', { title: 'Artifact Armory' });
});
app.get('/login', function(req, res) {
	res.render('pages/login', { title: 'Login' });
})

//error handler

app.use(function(err, req, res, next) {
	// set locals on for error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the status page
	res.status(err.status || 500);
	res.render(err.message);
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

module.exports = app;


// fs.readdirSync('./controllers').forEach(function (file) {
// 	if(file.substr(-3) == '.js') {
// 		route = require('./controllers/' + file);
// 		route.controller(app);
// 	}
// })
// app.post('/sign-up', (req, res) => {
// 	db.collection('users').save(req.body, (err, result) => {
// 		if (err) return console.log(err)

// 		console.log(req.body.username + ' was added as a user')
// 		res.redirect('/')
// 	})
// });


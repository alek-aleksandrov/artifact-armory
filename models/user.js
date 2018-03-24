var mongoose = require('mongoose')
	,Schema = mongoose.Schema
	userSchema = new Schema( {
		username: String,
		password: String,
		email: String,
		createdDate: String,
		lastLoggedIn: String,
		userRole: String
	}),
User = mongoose.model('user', userSchema);

module.export = User;

// MongoClient.connect(process.env.MONGODB, (err, database) => {
// 	if (err) return console.log(err);
// 	db = database.db('heroku_wrfq0phg');
// 	app.listen(3000, () => {
// 		console.log('listen on 3000');
// 	});
// });

// db.collection('users').save(req.body, (err, result) => {
// 	if (err) return console.log(err)

// 	console.log(req.body.username + ' was added as a user')
// 	res.redirect('/')
// })
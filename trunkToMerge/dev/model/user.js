var DB_User = require('./db_model/db_user.js');

function User () {
	this.data = new DB_User();
	this.data.init();
}


User.prototype.save = function () {
	this.data.save(function(err, result) {
		if (err)
			console.log("error : " + err);
	});
}

User.prototype.debug = function () {
	console.log(this.data);
}

module.exports = User;
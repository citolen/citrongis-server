var DB_User = require('./db_model/db_user.js');

function User () {
	this.data = new DB_User();
	this.data.init();
};

/*
** Class Method
*/

User.prototype.save = function (callback) {
	this.data.save(function(err, result) {
		if (err)
			console.log("error : " + err);
		callback(err);
	});
};

User.prototype.all = function(callback) {
	User.all(callback);
};

User.findOne = function(arg, callback) {
	User.findOne(arg, callback);
};

User.prototype.debug = function () {
	console.log(this.data);
};

 /*
 ** Object Function
 */
User.all = function (callback) {
 	DB_Extension.all(null, function(err, result) {
		if (err)
			console.log("error : " + err);
		else
			callback(result);
	});
}

User.findOne = function(arg, callback) {
	DB_User.all({where : arg}, function(err ,result) { //error if more than one 
		if (err)
			console.log("error : " + err);
		else {
			if (result.length < 1)
				err = "empty result";
			callback(err, result[0]);
		}
	})
};

module.exports = User;
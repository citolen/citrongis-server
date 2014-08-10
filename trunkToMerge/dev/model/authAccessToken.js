var DB_authAccessToken = require('./db_model/db_authAccessToken.js');

function authAccessToken () {
	this.data = new DB_authAccessToken();
	this.data.init();
};

/*
** Class Method
*/

authAccessToken.prototype.save = function (callback) {
	this.data.save(function(err, result) {
		if (err)
			console.log("error : " + err);
		callback();
	});
};

authAccessToken.prototype.all = function(callback) {
	authAccessToken.all(callback);
};

authAccessToken.prototype.findOne = function(arg, callback) {
	authAccessToken.findOne(arg, callback);
};

authAccessToken.prototype.debug = function () {
	console.log(this.data);
};

 /*
 ** Object Function
 */
authAccessToken.all = function (callback) {
 	DB_authAccessToken.all(null, function(err, result) {
		if (err)
			console.log("error : " + err);
		else
			callback(result);
	});
}

authAccessToken.findOne = function(arg, callback) {
	DB_authAccessToken.all({where : arg}, function(err ,result) { //error if more than one 
		if (err)
			console.log("error : " + err);
		else
			callback(err, result[0]);
	})
};

module.exports = authAccessToken
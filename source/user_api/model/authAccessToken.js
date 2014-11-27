var logger = require("../utility/logger.js");
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
		if (err) {
			logger.error(err);
		}
		callback(err);
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
		if (err) {
			logger.error(err);
			callback(err, null);
		} else {
			callback(err, result);
		}
	});
}

authAccessToken.findOne = function(arg, callback) {
    DB_authAccessToken.all({where : arg}, function(err ,result) {
		if (err) {
		    logger.error(err);
		    callback(err, null);
		} else {
		    callback(err, result[0]);
		}
    });
};

module.exports = authAccessToken
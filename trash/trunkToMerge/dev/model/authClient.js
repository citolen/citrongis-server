var DB_authClient = require('./db_model/db_authClient.js');

function authClient () {
	this.data = new DB_authClient();
	this.data.init();
};

/*
** Class Method
*/

authClient.prototype.save = function (callback) {
	this.data.save(function(err, result) {
		if (err)
			console.log("error : " + err);
		callback();
	});
};

authClient.prototype.all = function(callback) {
	authClient.all(callback);
};

authClient.prototype.findOne = function(arg, callback) {
	authClient.findOne(arg, callback);
};

authClient.prototype.debug = function () {
	console.log(this.data);
};

 /*
 ** Object Function
 */
authClient.all = function (callback) {
 	DB_authClient.all(null, function(err, result) {
		if (err)
			console.log("error : " + err);
		else
			callback(result);
	});
}

authClient.findOne = function(arg, callback) {
	DB_authClient.all({where : arg}, function(err ,result) {
		if (err)
			console.log("error : " + err);
		else 
		{
			if (result.length < 1)
				err = "empty result";
			callback(err, result[0]);
		}
	})
};

module.exports = authClient;
var DB_Extension = require('./db_model/db_extension.js');

function Extension () {
	this.data = new DB_Extension();
	this.data.init();
};


/*
** Class Method
*/

Extension.prototype.save = function (callback) {
	this.data.save(function(err, result) {
		if (err)
			console.log("error : " + err);
		callback();
	});
};

Extension.prototype.all = function(callback) {
	Extension.all(callback);
};

Extension.prototype.debug = function () {
	console.log(this.data);
};

 /*
 ** Object Function
 */
Extension.all = function (callback) {
 	DB_Extension.all(null, function(err, result) {
		if (err)
			console.log("error : " + err);
		else
			callback(result);
	});
}


module.exports = Extension;
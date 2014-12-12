var logger = require("../utility/logger.js");
var DB_Extension = require('./db_model/db_extension.js');

function Extension () {
	this.data = new DB_Extension();
	this.data.init();
};

Extension.prototype.setData = function(data) {
    this.data = data;
}

/*
** Class Method
*/

Extension.prototype.save = function (callback) {
    this.data.save(function(err, result) {
	if (err) {
	    logger.error(err)
	}
	callback(err);
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
		if (err) {
		    logger.error(err);
		    callback(err, null);
		} else {
		    callback(err, result);
		}
    });
}

Extension.findOne = function(arg, callback) {
	DB_Extension.all({where : arg}, function(err ,result) {
		if (err) {
			logger.error(err);
			callback(err, null);
		} else {
			callback(err, result[0]);
		}
	})
};

Extension.have = function(arg, callback) {
	DB_Extension.all({where : arg}, function(err ,result) {
		if (err) {
			logger.error(err);
			callback(err, null);
		} else {
			callback(err, (result.length != 0 ? true : false));
		}
	})
};


module.exports = Extension;
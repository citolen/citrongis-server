var logger = require("../utility/logger.js");
var DB_User = require('./db_model/db_user.js');

function User () {
	this.data = new DB_User();
	this.data.init();
};

User.prototype.setData = function(data) {
    this.data = data;
}

/*
** Class Method
*/

User.prototype.save = function (callback) {
    this.data.save(function(err, result) {
	if (err) {
	    logger.error(err);
	}
	callback(err);
    });
};

User.prototype.all = function(callback) {
    User.all(callback);
};

User.prototype.findOne = function(arg, callback) {
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
	if (err) {
	    logger.error(err);
	    callback(err, null);
	} else {
	    callback(err, result);
	}	
	});
}

User.findOne = function(arg, callback) {
    DB_User.all({where : arg}, function(err ,result) {
	if (err) {
	    logger.error(err);
			callback(err, null);
	} else {
	    callback(err, result[0]);
	}
    })
};

User.find = function(arg, callback) {
    DB_User.all({where : arg}, function(err ,result) {
	if (err) {
	    logger.error(err);
			callback(err, null);
	} else {
	    callback(err, result);
	}
    })
};

User.have = function(arg, callback) {
    DB_User.all({where : arg}, function(err ,result) {
	if (err) {
	    logger.error(err);
	    callback(err, null);
	} else {
	    callback((result.length != 0 ? true : false));
	}
    })
};

module.exports = User;
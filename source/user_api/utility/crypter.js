var logger = require("../utility/logger.js");

function crypter() {
}

crypter.hash = function (string, callback) {
	var bcrypt = require("bcrypt");
	bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(string, salt, function(err, hash_string) {
			if (err)
				logger.error(err);
			callback(err, hash_string);
		});
	});
}

crypter.compare = function (origin, hash, callback) {
	var bcrypt = require("bcrypt");
	bcrypt.compare(origin, hash, callback);
}

module.exports = crypter;


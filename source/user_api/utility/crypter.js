function crypter() {
}

crypter.hash = function (string, callback) {
	var bcrypt = require("bcrypt");
	bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(string, salt, function(err, hash_string) {
			callback(err, hash_string);
		});
	});
}

crypter.compare = function (origin, hash, callback) {
	var bcrypt = require("bcrypt");
	bcrypt.compare(origin, hash, callback);
}

module.exports = crypter;


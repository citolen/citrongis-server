function userFromToken(header, callback) {
    var accessTokenManager = require('../manager/accessTokenManager.js');

    if (header["authorization"]) {
	var token = header["authorization"].replace("Bearer ", "");
	
	accessTokenManager.getWithId(token, function(result) {
	    callback(result.userId);
	});
    }
}

module.exports = userFromToken;
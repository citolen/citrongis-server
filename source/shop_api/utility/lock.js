var request = require("request");
var logger = require("../utility/logger.js");

function lock(headers, callback) {
	// Get authorization row
	var authorization = headers.authorization;

	// Check if authorization exist
	if (authorization) {
		askForAuth(authorization, callback);
	} else {
		var err = "Missing authorization information";
        logger.error(err);
        callback(err, null);
	}
	
}

function askForAuth(authorization, callback) {
	// Build form to submit
	var post_form = {
		url : "http://localhost:8080/auth/authorise",
		headers : { Authorization : authorization} 
	}

	// Submit form
	request.post(post_form, function (err , res, body) {
		if (!err) {
			if (res.statusCode && res.statusCode == 200) {
				callback(err, body);
			} else {		
				var err = "UserApi refused the connection. Return of userApi : " + body;
		        logger.error(err);
		        callback(err, null);
			}
		} else {
			logger.error(err);
        	callback(err, null);
		}
	});
}

module.exports = lock;
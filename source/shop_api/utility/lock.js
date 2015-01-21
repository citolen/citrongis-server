var request = require("request");
var logger = require("../utility/logger.js");

function lock(headers, res, callback) {
	// Get authorization row
	var authorization = headers.authorization;

	// Check if authorization exist
	if (authorization) {
		askForAuth(authorization, function(err, user_id) {
			if (err) {
				res.status(401);
				res.send(err);
			} else {
				callback(null, user_id);
			}
		});
	} else {
		var err = "Missing authorization information";
        logger.error(err);
        res.status(401);
        res.send(err);
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
				err = new Error("UserApi refused the connection. Return of userApi : " + body);
				err.statusCode = 401;
		        logger.error(err.message);
		        callback(err.message, null);
			}
		} else {
			logger.error(err);
        	callback(err, null);
		}
	});
}

module.exports = lock;
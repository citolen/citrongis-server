var assert = require("../assert.js");
var request = require("request");
var async = require("async");
require('../config.js');

function subscribe(email_str, password_str, callback) {
    var subscribe_form = {
	email: email_str,
	password: password_str
    };

    var post_form = {
	url: user_api_addr + '/auth/subscribe',
	form: subscribe_form
    };

    request.post(post_form, function (err, res, body) {
	callback(body);
    });
}

function main()
{
    async.series([
	function (callback) {
	    subscribe("user@epitech.eu", "user_password", function (value) {
		assert(value, "Ok", true);
		callback(null, "");
	    });
	},
	function (callback) {
	    subscribe("user@epitech.eu", "user_password", function (value) {
		assert(value, "Ok", false);
		callback(null, "");
	    });
	},
	function (callback) {
	    subscribe("otherUser@epitech.eu", "pass", function (value) {
		assert(value, "Ok", false);
		callback(null, "");
	    });
	},
	function (callback) {
	    subscribe("randomUser@epitech.eu", "user_password", function (value) {
		assert(value, "Ok", true);
		callback(null, "");
	    });
	}
    ]);
};

main();
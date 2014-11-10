var assert = require("../assert.js");
var request = require("request");
var async = require("async");

function subscribe(email_str, password_str, callback) {
    var subscribe_form = {
	email: email_str,
	password: password_str
    };

    var post_form = {
	url: 'http://localhost:8080/auth/subscribe',
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
	    subscribe("nicolas.pretot@epitech.eu", "nicolaspretot", function (value) {
		assert(value, "Ok", true);
		callback(null, "");
	    });
	},
	function (callback) {
	    subscribe("nicolas.pretot@epitech.eu", "nicolaspretot", function (value) {
		assert(value, "Ok", false);
		callback(null, "");
	    });
	},
	function (callback) {
	    subscribe("nicolas@epitech.eu", "nicola", function (value) {
		assert(value, "Ok", false);
		callback(null, "");
	    });
	},
	function (callback) {
	    subscribe("n.pretot@epitech.eu", "nicolaspretot", function (value) {
		assert(value, "Ok", true);
		callback(null, "");
	    });
	}
    ]);
};

main();
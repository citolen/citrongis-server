var assert = require("../assert.js");
var async = require("async");
var request = require("request");

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

function login(username, password, client_id, client_secret, callback) {
    var login_form = {
	grant_type: "password",
        username: username,
        password: password,
        client_id: client_id,
        client_secret: client_secret
    };

    var post_form = {
	url: 'http://localhost:8080/auth/login',
	form: login_form
    };

    request.post(post_form, function (err, res, body) {
	try {	
	    body = JSON.parse(body);
	} catch (e) {}
	callback({ "status" : res.statusCode, "token" : body.access_token});
    });

}

function createTestAccount(mainCallback) {
    async.series([
	function (callback) {
	    subscribe("user1@epitech.eu", "password1", function (value) {
		assert(value, "Ok", true);
		callback(null, "");
	    });
	},
	function (callback) {
	    subscribe("user2@epitech.eu", "password2", function (value) {
		assert(value, "Ok", true);
		callback(null, "");
	    });
	}
    ], function (err, result) {
	mainCallback(null, "");
    });
    
}

function main() 
{
    var token1;
    var token2;

    async.series([
	createTestAccount,
	function (callback) {
	    login("user1@epitech.eu", "password1", "testclientid", "testclientsecret", function(value) {
		assert(value.status, 200, true);
		token1 = value.token;
		callback(null, "");
	    });
	},
	function (callback) {
	    login("user2@epitech.eu", "password2", "testclientid", "testclientsecret", function(value) {
		assert(value.status, 200, true);
		token2 = value.token;
		callback(null, "");
	    });
	},
	function (callback) {
	    // recupre infos mais faut token user 1
	},
	function (callback) {
	    // post infos mais faux token user 1
	},
	function (callback) {
	    // recupp infos user 2
	},
	function (callback) {
	    // posrt infos user 2
	},
	function (callback) {
	    // get infos user 1
	},
	function (callback) {
	    // post infos user 1
	},
	function (callback) {
	    // post info user 2
	},
	function (callback) {
	    // recupp infos user 2
	},
	function (callback) {
	    // recupp infos user 2
	},
	function (callback) {
	    // recupp infos user 2
	},
	function (callback) {
	    // recupp infos user 2
	},
    ]);
}

main()
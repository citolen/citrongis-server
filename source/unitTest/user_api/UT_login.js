var assert = require("../assert.js");
var async = require("async");
var request = require("request");
require("../config.js");

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

function login(username, password, client_id, client_secret, callback) {
    var login_form = {
        email: username,
        password: password,
        client_id: client_id,
        client_secret: client_secret
    };

    var post_form = {
	url: user_api_addr + '/auth/login',
	form: login_form
    };

    request.post(post_form, function (err, res, body) {
	try {	
	    body = JSON.parse(body);
	} catch (e) {}
	callback({ "status" : res.statusCode, "token" : body.access_token});
    });

}

function createTestAccount(callback) {
    subscribe("user@epitech.eu", "user_password", function (value) {
	assert(value, "Ok", true);
	callback(null, "");
    });
}

function main()
{
    async.series([
	createTestAccount,
	function (callback) { //Login user1
	    login("user@epitech.eu", "user_password", "testclientid", "testclientsecret", function(value) {
	    	console.log("Login user1");
			assert(value.status, 200, true);
			callback(null, "");
	    });
	},
	function (callback) { //Bad login
	    login("wrongEmail@epitech.eu", "user_password", "testclientid", "testclientsecret", function(value) {
	    	console.log("Login with bad eamail")
			assert(value.status, 500, true);
			callback(null, "");
	    });
	},
	function (callback) { //Bad password
	    login("user@epitech.eu", "WrongPassword", "testclientid", "testclientsecret", function(value) {
	    	console.log("Login with bad password");
			assert(value.status, 500, true);
			callback(null, "");
	    });
	},
	function (callback) { //Bad client_id
	    login("user@epitech.eu", "user_password", "Wrongclientid", "testclientsecret", function(value) {
	    	console.log("Login with bad client_id");	    	
			assert(value.status, 500, true);
			callback(null, "");
	    });
	},
	function (callback) { //Bad client_secret
	    login("user@epitech.eu", "user_password", "testclientid", "WrongClientsecret", function(value) {
	    	console.log("Login with bad client_secret");
			assert(value.status, 500, true);
			callback(null, "");
	    });
	}
    ]);
}

main();
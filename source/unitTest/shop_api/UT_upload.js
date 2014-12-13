var assert = require("../assert.js");
var async = require("async");
var request = require("request");
var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');
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

function upload(path, token, callback) {
    var post_form = {
	url : shop_api_addr + "/upload",
	headers : { Authorization: 'Bearer ' + token}
    }

    var r = request.post(post_form, function (err, res, body) {
		try {	
	    	body = JSON.parse(body);
		} catch (e) {}
		callback(res.statusCode);
    });
    var form = r.form();
    form.append('file', fs.createReadStream(path));
}

function main() 
{
    var token1;
    var token2;

    async.series([
	createTestAccount,
	function (callback) { //Login user1
	    login("user1@epitech.eu", "password1", "testclientid", "testclientsecret", function(value) {
		    console.log("Login user 1");
			assert(value.status, 200, true);
			token1 = value.token;
			callback(null, "");
	    });
	},
	function (callback) { //Login user2
	    login("user2@epitech.eu", "password2", "testclientid", "testclientsecret", function(value) {
		    console.log("Login user 2");
			assert(value.status, 200, true);
			token2 = value.token;
			callback(null, "");
	    });
	},
	function (callback) { //upload citrongis-app-v1 without dependencies (bad)
		upload("./shop_api/ressources/citrongis-app.zip", token1, function(value) {
		    console.log("User 1 : Upload citrongis-app-v1 without dependencies");
			assert(value, 500, true);
			callback(null, "");
	    });
	},
	function (callback) { //upload testapli1-v1  with user 1 (good)
		upload("./shop_api/ressources/testapli1.zip", token1, function(value) {
		    console.log("User 1 : Upload testapli1-v1");
			assert(value, 200, true);
			callback(null, "");
	    });
	},
	function (callback) { //upload testapli2-v1  with user 1 (good)
		upload("./shop_api/ressources/testapli2.zip", token1, function(value) {
			console.log("User 1 : Upload testapli2-v1");
			assert(value, 200, true);
			callback(null, "");
	    });
	},
	function (callback) { //upload citrongis-app-v1 (good)
		upload("./shop_api/ressources/citrongis-app.zip", token1, function(value) {
			console.log("User 1 : Upload citrongis-app-v1");
			assert(value, 200, true);
			callback(null, "");
	    });
	},
	function (callback) { //upload testappli1-v1 with user 2 (bad right)
		upload("./shop_api/ressources/testapli1.zip", token2, function(value) {
			console.log("User 2 : Upload testapli1-v1 (bad right)");
			assert(value, 500, true);
			callback(null, "");
	    });
	},
	function (callback) { //upload testappli1-v2 with user 2 (bad right)
		upload("./shop_api/ressources/testapli1-v2.zip", token2, function(value) {
			console.log("User 2 : Upload testapli1-v2 (bad right)");
			assert(value, 500, true);
			callback(null, "");
	    });
	},
	function (callback) { //upload testappli1-v2 with user 1 (good)
		upload("./shop_api/ressources/testapli1-v2.zip", token1, function(value) {
			console.log("User 2 : Upload testapli1-v2");
			assert(value, 200, true);
			callback(null, "");
	    });
	},
	function (callback) { //upload citrongis-app-v2 with user 1 (bad dependencies)
		upload("./shop_api/ressources/citrongis-app-v2.zip", token1, function(value) {
			console.log("User 2 : Upload citrongis-app-v2");
			assert(value, 500, true);
			callback(null, "");
	    });
	}
    ]);
}

main()
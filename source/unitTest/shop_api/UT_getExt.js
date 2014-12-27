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

function getExt(data, token, callback) 
{
	var post_form = {
		url : shop_api_addr + "/ext/getExt",
		headers : { Authorization: 'Bearer ' + token},
		form : data
	}

	request.post(post_form, function (err, res, body) {
		try {   
			body = JSON.parse(body);
		} catch (e) {}
		callback({ "status" : res.statusCode, "data" : body});
	});
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
		function (callback) { //upload testapli1-v1 with user 1 (good)
			upload("./shop_api/ressources/testapli1.zip", token1, function(value) {
			console.log("User 1 : Upload testapli1-v1");
			assert(value, 200, true);
			callback(null, "");
			});
		},
		function (callback) { //upload testapli2-v1 with user 1 (good)
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
		function (callback) { //upload testappli1-v2 with user 1 (good)
			upload("./shop_api/ressources/testapli1-v2.zip", token1, function(value) {
			console.log("User 2 : Upload testapli1-v2");
			assert(value, 200, true);
			callback(null, "");
			});
		},
		function (callback) { //Get all extensions with 1 in name
			var s0 = {
				"search" :{"informations_name": "1"},
				"keys": {"informations_version": ""}
				};

			getExt(s0, token1, function(value) {
				var s1 = [
					{"informations_version": "0.0.1"},
					{"informations_version": "0.0.2"}
				];
				console.log("Get all extensions with 1 in name");
				assert(JSON.stringify(value.data), JSON.stringify(s1), true);
				callback(null, "");
			});
		},
		function (callback) { //Get all extensions with azerty in name (0 result)
			var s0 = {
				"search" :{"informations_name": "azerty"},
				"keys": {"informations_version": ""}
				};

			getExt(s0, token1, function(value) {
				var s1 = [];
				console.log("Get all extensions with azerty in name (0 result)");
				assert(JSON.stringify(value.data), JSON.stringify(s1), true);
				callback(null, "");
			});
		},
		function (callback) { //Invalid request
			var s0 = {
				"sssss" :{"informations_name": "azerty"},
				"keys": {"informations_version": ""}
				};

			getExt(s0, token1, function(value) {
				console.log("Invalid request");
				assert(value.status, 500, true);
				callback(null, "");
			});
		},
		function (callback) { //Get all extensions ended with 2
			var s0 = {
				"search": {"informations_name": "2$"},
				"keys": {"informations_name": ""}
			};

			getExt(s0, token1, function(value) {
				var s1 = [{"informations_name": 'testapli2'}];
				console.log("Get all extensions ended with 2");
				assert(JSON.stringify(value.data), JSON.stringify(s1), true);
				callback(null, "");
			});
		},
		function (callback) { //Get all extensions started with ci
			var s0 = {
				"search": {"informations_name": "^ci"},
				"keys": {"informations_name": ""}
			};

			getExt(s0, token1, function(value) {
				var s1 = [{"informations_name": 'citrongis-first-app'}];
				console.log("Get all extensions started with ci");
				assert(JSON.stringify(value.data), JSON.stringify(s1), true);
				callback(null, "");
			});
		},
		function (callback) { //Get all extensions started with ci and ended with app
			var s0 = {
				"search": {"informations_name": "^ci", "informations_name": "app$"},
				"keys": {"informations_name": ""}
			};

			getExt(s0, token1, function(value) {
				var s1 = [{"informations_name": 'citrongis-first-app'}];
				console.log("Get all extensions started with ci and ended with app");
				assert(JSON.stringify(value.data), JSON.stringify(s1), true);
				callback(null, "");
			});
		},
		function (callback) { //Get all extensions with REGEX (no result)
			var s0 = {
				"search": {"informations_name": "^ci", "informations_name": "app$", "informations_version": "233"},
				"keys": {"informations_name": ""}
			};

			getExt(s0, token1, function(value) {
				var s1 = [];
				console.log("Get all extensions with REGEX (no result)");
				assert(JSON.stringify(value.data), JSON.stringify(s1), true);
				callback(null, "");
			});
		}
	]);
}

main();
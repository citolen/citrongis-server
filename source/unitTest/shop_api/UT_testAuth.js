var assert = require("../assert.js");
var async = require("async");
var request = require("request");
var MongoClient = require('mongodb').MongoClient;
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

function getId(token, callback) {
    var post_form = {
		url : shop_api_addr + "/testAuth",
		headers : { Authorization: 'Bearer ' + token}
    };

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
    var id1;
    var id2;

    async.series([
	createTestAccount,
	function (callback) { //getIDs
		MongoClient.connect('mongodb://'+ mongo_db_addr + '/eip', function (err, db) {
			if (err) {
				return (console.log(err));
			}
			db.collection('User').find({}).toArray(function(err, docs) {
				id1 = docs[0]._id;
				id2 = docs[1]._id;
				db.close();
				callback(null, "");
			});
		});
	},
	function (callback) { //Login user1
	    login("user1@epitech.eu", "password1", "testclientid", "testclientsecret", function(value) {
    		console.log("Login User1");
			assert(value.status, 200, true);
			token1 = value.token;
			callback(null, "");
	    });
	},
	function (callback) { //Login user2
	    login("user2@epitech.eu", "password2", "testclientid", "testclientsecret", function(value) {
    		console.log("Login User2");
			assert(value.status, 200, true);
			token2 = value.token;
			callback(null, "");
	    });
	},
	function (callback) { //testAuth with good token
	    getId(token1, function (value) {
    		console.log("Test auth with good token");
			assert(value.data, id1, true);
			callback(null, "");
	    });
	},
	function (callback) { //testAuth with bad token
	    getId(token2 + 1, function (value) {
    		console.log("Test auth with bad token");
			assert(value.status, 401, true);
			callback(null, "");
	    });
	}
    ]);
}

main()
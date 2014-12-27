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

function getUsers(data, token, callback) 
{
	var post_form = {
		url : user_api_addr + "/user/getUser",
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

function setProfile(data, token, callback) {
	var post_form = {
	url : user_api_addr + "/account/set",
		headers : { Authorization: 'Bearer ' + token},
	form : data
	}

	request.post(post_form, function(err, res, body) {
	callback(res.statusCode);
	});

}

function main() 
{
	var token1;
	var token2;

	async.series([
	createTestAccount, //create User1 && User2
	function (callback) { //Login User1
		login("user1@epitech.eu", "password1", "testclientid", "testclientsecret", function(value) {
			console.log("Login User1"),
			assert(value.status, 200, true);
			token1 = value.token;
			callback(null, "");
		});
	},
	function (callback) { //Login User2
		login("user2@epitech.eu", "password2", "testclientid", "testclientsecret", function(value) {
			console.log("Login User2");
			assert(value.status, 200, true);
			token2 = value.token;
			callback(null, "");
		});
	},
	function (callback) { //set profile User1
		var s = {"userInfo_firstName": "UserName1", 
			 "userInfo_lastName": "1lastnameUser1",
			 "userInfo_dateOfBirth" : "01/08/1980",
			 "userInfo_language" : "fr",
			 "userInfo_profileType" : "user",
			 "userInfo_picture" : "/img/profile-05246",
			 "userInfo_contact_email" : "user1@epitech.eu",
			 "userInfo_contact_phoneNumber" : "0685959565",
			 "userInfo_contact_location" : "Paris",
			 "userInfo_job_status" : "Team Member",
			 "userInfo_job_company_name" : "MyCompany",
			 "userInfo_job_company_location" : "Paris",
			 "accountInfo_creationDate" : "05/06/1985"
			};
		setProfile(s, token1 , function (value) {
			console.log("Set Profile User1");
			assert(value, 200, true);
			callback(null, "")
		});
	},
	function (callback) { //set profile User2
		var s = {"userInfo_firstName": "UserName2", 
			 "userInfo_lastName": "lastnameUser2",
			 "userInfo_dateOfBirth" : "01/08/1980",
			 "userInfo_language" : "fr",
			 "userInfo_profileType" : "user",
			 "userInfo_picture" : "/img/profile-05246",
			 "userInfo_contact_email" : "user2@epitech.eu",
			 "userInfo_contact_phoneNumber" : "0685959565",
			 "userInfo_contact_location" : "Paris",
			 "userInfo_job_status" : "Team Member",
			 "userInfo_job_company_name" : "MyCompany",
			 "userInfo_job_company_location" : "Paris",
			 "accountInfo_creationDate" : "05/06/1985"
			};
		setProfile(s, token2 , function (value) {
			console.log("Set Profile User2");
			assert(value, 200, true);
			callback(null, "")
		});
	},
	function (callback) { //Get User with *epitech.com in email
		var s0 = {
			"search" :{"authInfo_email": "epitech"},
			"keys": {"userInfo_firstName": ""}
		};

		getUsers(s0, token1, function(value) {
			var s1 = [
				{"userInfo_firstName": "UserName1"},
				{"userInfo_firstName": "UserName2"}
			];

			console.log("Get all users with *epitech.eu in email");
			assert(JSON.stringify(value.data), JSON.stringify(s1), true);
			callback(null, "");
		});
	},
	function (callback) { //Get 0 Result
		var s0 = {
			"search" :{"authInfo_email": "a"},
			"keys": {"userInfo_firstName": ""}
		};

		getUsers(s0, token1, function(value) {
			var s1 = [];
			
			console.log("Get all users with email 'a' (0 result)");
			assert(JSON.stringify(value.data), JSON.stringify(s1), true);
			callback(null, "");
		});
	},
	function (callback) { //Invalid request
		var s0 = {
			"sss" :{"authInfo_email": "a"},
			"keys": {"userInfo_firstName": ""}
		};

		getUsers(s0, token1, function(value) {
			console.log("Invalid request");
			assert(value.status, 500, true);
			callback(null, "");
		});
	},
	function (callback) { //Get all user ended with 2
		var s0 = {
			"search": {"userInfo_firstName": "2$"},
			"keys": {"userInfo_firstName": ""}
		};

		getUsers(s0, token1, function(value) {
			var s1 = [{"userInfo_firstName": 'UserName2'}]
			console.log("Get all user ended with 2");
			assert(JSON.stringify(value.data), JSON.stringify(s1), true);
			callback(null, "");
		});
	},
	function (callback) { //set profile User2
		var s = {"userInfo_firstName": "2UserName2", 
			 "userInfo_lastName": "lastnameUser2",
			 "userInfo_dateOfBirth" : "01/08/1980",
			 "userInfo_language" : "fr",
			 "userInfo_profileType" : "user",
			 "userInfo_picture" : "/img/profile-05246",
			 "userInfo_contact_email" : "user2@epitech.eu",
			 "userInfo_contact_phoneNumber" : "0685959565",
			 "userInfo_contact_location" : "Paris",
			 "userInfo_job_status" : "Team Member",
			 "userInfo_job_company_name" : "MyCompany",
			 "userInfo_job_company_location" : "Paris",
			 "accountInfo_creationDate" : "05/06/1985"
			};
		setProfile(s, token2 , function (value) {
			callback(null, "")
		});
	},
	function (callback) { //Get all user ended with 2
		var s0 = {
			"search": {"userInfo_firstName": "^2"},
			"keys": {"userInfo_firstName": ""}
		};

		getUsers(s0, token1, function(value) {
			var s1 = [{"userInfo_firstName": '2UserName2'}]
			console.log("Get all user started with 2");
			assert(JSON.stringify(value.data), JSON.stringify(s1), true);
			callback(null, "");
		});
	},
	function (callback) { //Get user with REGEXP 
		var s0 = {
			"search": {"userInfo_firstName": "1$", "userInfo_lastName": "^1"},
			"keys": {"userInfo_firstName": ""}
		};

		getUsers(s0, token1, function(value) {
			var s1 = [{"userInfo_firstName": 'UserName1'}]
			console.log("Get user with REGEXP");
			assert(JSON.stringify(value.data), JSON.stringify(s1), true);
			callback(null, "");
		});
	},
	function (callback) { //Get user with REGEXP (no result)
		var s0 = {
			"search": {"userInfo_firstName": "1$", "userInfo_lastName": "^1", "userInfo_job_company_location": "Toulouse"},
			"keys": {"userInfo_firstName": ""}
		};

		getUsers(s0, token1, function(value) {
			var s1 = []
			console.log("Get user with REGEXP (No result)");
			assert(JSON.stringify(value.data), JSON.stringify(s1), true);
			callback(null, "");
		});
	},
	]);
}

main()
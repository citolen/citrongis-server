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
        email: username,
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

function getProfile(data, token, callback) {
    var post_form = {
	url : "http://localhost:8080/account/get",
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
	url : "http://localhost:8080/account/set",
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
	    getProfile({"authInfo_email": ""}, token1 + "1", function (value) {
		assert(value.status, 401, true);
		callback(null, "")
	    });
	},
	function (callback) {
	    setProfile({"userInfo_firstName": ""}, token1 + "1", function (value) {
		assert(value, 401, true);
		callback(null, "")
	    });
	},
	function (callback) {
	    getProfile({"authInfo_email": ""}, token2, function (value) {
		var s = { "authInfo_email" : "user2@epitech.eu" };
		assert(JSON.stringify(value.data), JSON.stringify(s), true);
		callback(null, "")
	    });
	},
	function (callback) {
	    setProfile({"userInfo_firstName": "UserName2"}, token2 , function (value) {
		assert(value, 200, true);
		callback(null, "")
	    });
	},
	function (callback) {
	    getProfile({"authInfo_email": "", "userInfo_lastName": ""}, token1, function (value) {
		var s = { "authInfo_email" : "user1@epitech.eu",
			  "userInfo_lastName" : null};
		assert(JSON.stringify(value.data), JSON.stringify(s), true);
		callback(null, "")
	    });
	},
	function (callback) {
	    setProfile({"userInfo_firstName": "UserName1", "userInfo_lastName": "lastnameUser1"}, token1 , function (value) {
		assert(value, 200, true);
		callback(null, "")
	    });
	},
	function (callback) {
	    setProfile({"userInfo_wrongKey": "UserName1", "userInfo_lastName": "lastnameUser1"}, token1 , function (value) {
		assert(value, 500, true);
		callback(null, "")
	    });
	},
	function (callback) {
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
		assert(value, 200, true);
		callback(null, "")
	    });
	},
	function (callback) {
	    var s0 = {"userInfo_firstName": "", 
		      "userInfo_lastName": "",
		      "userInfo_dateOfBirth" : "",
		      "userInfo_language" : "",
		      "userInfo_profileType" : "",
		      "userInfo_picture" : "",
		      "userInfo_contact_email" : "",
		      "userInfo_contact_phoneNumber" : "",
		      "userInfo_contact_location" : "",
		      "userInfo_job_status" : "",
		      "userInfo_job_company_name" : "",
		      "userInfo_job_company_location" : "",
		      "accountInfo_creationDate" : ""
		     };
	    
	    getProfile(s0, token2, function (value) {
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
		assert(JSON.stringify(value.data), JSON.stringify(s), true);
		callback(null, "")
	    });
	}
    ]);
}

main()
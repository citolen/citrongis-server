function controller(route) {
    
    // Route
    this.routes = {};
    this.createRoute(route);

    // Url
    this.url = "http://localhost:8080";
    this.urls = {};
    this.createUrl();

    // Html
    this.html = {};
    this.requireHtml();

    // Var
    this.token = null;
}

controller.prototype.createRoute = function(route) {
    this.routes["index"] = route;
    this.routes["login"] = route + "/login";
    this.routes["saveToken"] = route + "/savetoken";
    this.routes["account"] = route + "/account";
    this.routes["post_account"] = route + "/post_account";
    this.routes["account_handle"] = route + "/account_handle";
}

controller.prototype.createUrl = function() {
   for(var route in this.routes) {
	this.urls[route] = this.url + this.routes[route];
    }
}

controller.prototype.requireHtml = function() {
    this.html["index"] = require("./html/index.js");
    this.html["account"] = require("./html/account.js");
}

controller.prototype.getIndex = function() {
    return this.html["index"](this.urls);
}

controller.prototype.saveToken = function(data) {
    if (data == null) {
	console.log("Error : body is empty");
	return;
    }    
    this.token = (data.token ? data.token : null);
}

controller.prototype.getLoginHandler = function() {
    return {
	post: this.urls["saveToken"],
	get: this.urls["index"]
    }
}

controller.prototype.getAccount = function(callback) {
    var request = require('request');
    var me = this;
    
    var data = {"authInfo_email": "",
		"authInfo_password": "",
		"userInfo_firstName": "",
		"userInfo_lastName": "",
		"userInfo_dateOfBirth": "",
		"userInfo_language": "",
		"userInfo_profileType": "",
		"userInfo_picture": "",
		"userInfo_contact_email": "",
		"userInfo_contact_phoneNumber": "",
		"userInfo_contact_location": "",
		"userInfo_job_status": "",
		"userInfo_job_company_name": "",
		"userInfo_job_company_location": "",
		"accountInfo_creationDate": ""};

    request.post({
	url : this.url + "/account/get",
	headers : { Authorization: 'Bearer ' + this.token},
	form : data
    }, function (err, res_data, body) {
	console.log(res_data.body);
	try {
	    callback(me.html["account"](me.urls, JSON.parse(res_data.body)));
	} catch(e) {}
    });
}

controller.prototype.post_account = function(callback) {
    var request = require('request');

    request.get({
	url : this.urls["account"],
	headers : { Authorization: 'Bearer ' + this.token}
    }, function(err, res_data, body) {
	callback(body);
    });
} 

controller.prototype.account_run = function(data) {
    var button = null;
    
    if (data.button)
	button = data.button;

    this.submit(data);
}

controller.prototype.submit = function(data) {
    var request = require('request');

    console.log(data);
    
    request.post({
	url : this.url + "/account/set",
	headers : { Authorization: 'Bearer ' + this.token},
	form : data
    }, function(err, res_data, body) {
	console.log(body);
    });
}

controller.prototype.clear = function(data) {

}

controller.prototype.auth = function(data) {
    var request = require('request');

    request.get({
	url : this.url + "/account/authInfo/login",
	headers : { Authorization: 'Bearer ' + this.token}
    }, function(err, res_data, body) {
	console.log(body);
    });
}

controller.prototype.user = function(data) {
}

controller.prototype.account = function(data) {
}

module.exports = controller;

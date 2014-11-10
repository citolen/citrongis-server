function main(app, route) {
    this.name = "Authentification";
    this.description = "subscribe, login and go to secret page";
    this.route = route + "/authentification";
    
    this.app = app;
    
    this.route_subscribe =  this.route + "/subscribe";
    this.route_subscribe_handle =  this.route + "/subscribe_handle";
    this.route_login = this.route + "/login";
    this.route_login_handle = this.route + "/login_handle";
    this.route_secret = this.route + "/secret";
    this.route_secret_prepare = this.route + "/secret_prepare";
    this.route_logout = this.route + "/logout";
    
    this.initDB();

    this.status = true;
    
    this.initRoute();
}

main.prototype.initDB = function() {
    //insert a client
    var Client = require("../../../user_api/model/authClient.js");

    Client.findOne({'clientId' : "testclientid", 'clientSecret' : "testclientsecret"}, function(err, result) {
	if (!result) {
	    var client = new Client();
	    
	    client.data.clientId = "testclientid";
	    client.data.clientSecret = "testclientsecret";

	    client.save(function (err) {
		if (err)
		    console.log("fail init login_test");
	    });
	}
    });
}

main.prototype.initRoute = function() {
    var me = this;
    var accessToken;
    
    
    var main = function (body , res) {
 	accessToken = me.getAccesToken(body);
 	var to_send = me.getStatusBox(accessToken) + me.getActionBox(accessToken);
 	res.send(to_send);
    }
    
    /* MAIN PAGE */
    me.app.get(me.route, function(req , res) {
 	main(req.body, res);
    });
    
    /* SUBSCRIBE PAGE */
    me.app.get(me.route_subscribe, function (req, res) {
	var to_send = me.getSubscribeForm();
	res.send(to_send);
    });
    
    
    /* SUBSCRIBE HANDLE */
    me.app.post(me.route_subscribe_handle,  function (req, res) {
	var request = require('request');
	
	var missingFields = new Array;
	
	if (!req.body.email) 
	    missingFields.push("email");
	if (!req.body.password)
	    missingFields.push("password");
	
	if (missingFields.length > 0) {
	    res.send("Error some fields are missing : " + missingFields.toString());
	    return;
	}

	request.post({
		url: 'http://localhost:8080/auth/subscribe',
	    form: {
		email: req.body.email,
		password: req.body.password
	    }
	}, function (err, res2, body) {
		if (req.body == "Ok")
	    	var to_send = me.getSubscribeOk();
	    else
	    	var to_send = res2.body;
	    if (err)
		res.send(err)
	    res.send(to_send);
	}); 
    });
    
    /* SECRET PAGE */
    me.app.get(this.route_secret, me.app.oauth.authorise(), function (req, res) {
	res.send("THIS IS A SECRET PAGE");
    });
    
    /* LOGIN PAGE */
    me.app.get(this.route_login, function (req, res) {
	var to_send = me.getLoginForm();
	res.send(to_send);
    });
    
    /* LOGIN HANDLE */    
    me.app.post(this.route_login_handle, function (req, res) {
	var request = require('request');
	
	var missingFields = new Array;
	
	if (!req.body.client_id) 
	    missingFields.push("client_id")
	if (!req.body.client_secret) 
	    missingFields.push("client_secret");
	if (!req.body.grant_type) 
	    missingFields.push("grant_type");
	if (!req.body.email) 
	    missingFields.push("email");
	if (!req.body.password)
	    missingFields.push("password");
	
	if (missingFields.length > 0) {
	    res.send("Error some fields are missing : " + missingFields.toString());
	    return;
	}	
	    
	request.post({  
	    url: 'http://' + new Buffer(req.body.client_id + ":" + req.body.client_secret).toString('base64') + '@192.168.56.101:8080/auth/login',
	    form: {
		grant_type: req.body.grant_type,
		username: req.body.email,
		password: req.body.password,
		client_id: req.body.client_id,
		client_secret: req.body.client_secret
	    },
	}, function(err, res2, body) {
	    if (body) {
		try {
		    parsedBody = JSON.parse(body);
		} catch (ex) {
		    return;
		}
	    } else {
		console.log("body not found in answer");
		return;
	    }

	    if (parsedBody["access_token"])
		accessToken = parsedBody["access_token"];
	    else {
		console.log("accesToken not found in answer");
		return;
	    }
		
	    request.get({
		url: 'http://localhost:8080'+  me.route,
		headers: { Authorization: accessToken }
	    }, function(err, res3, body) {
		main(res3.request.headers, res);
	    });
	});
    });

    me.app.get(this.route_secret_prepare, function (req, res)  {
        var request = require('request');	
	if (!req.query.token)
	    res.send("Error no token");
	else {
	    request.get({
		url: 'http://localhost:8080' + me.route_secret, 
		headers: { Authorization: 'Bearer ' + req.query.token }
	    }, function (err, res2, body) {
		res.send(body);
	    })
	}
    });
}

main.prototype.getSubscribeOk = function() {
    var str = 'Account Created ! <br /><a href="' + this.route + '">return</a>';
    return str;
}

main.prototype.getStatusBox = function(accessToken) {
    var str = '<div style="border: 1px solid black; width : 350px; margin : auto">' +
	(accessToken == null ? 'disconnected' : 'Connected             token = ' + accessToken) +
	'</div>';
    return str;
}

main.prototype.getActionBox = function(token) {
    var str = 'How to test :<br />' +
	'1) Try to go on secret page you will get an error with stacktrace (cause debug mode is true)<br />' +
	'2) Create an account<br />' +
	'3) Login<br />' +
	'4) Go to secret page<br />' +
	'<br />Note : <br />' + 
	'  - You can check your current status on the top<br />' +
	'  - You can refresh this page after login to get new token<br />' +
	'  - You can clean your token by clicking on "clean token"<br /><br />' +
	'<div style="border: 1px solid black">' +
	'<a href="http://192.168.56.101:8080'+  this.route_subscribe + '">subscribe</a><br />' +
	'<a href="http://192.168.56.101:8080'+  this.route_login + '">login</a><br />' +
	'<a href="http://192.168.56.101:8080'+  this.route_secret_prepare + '?token=' + token + '">secret</a><br />' +
	'<a href="http://192.168.56.101:8080'+  this.route + '">clean token</a><br />' +
	'</div>';
    return str;
}

main.prototype.getAccesToken = function(data) {
    if (data["Authorization"])
	return data["Authorization"]
    return null;
}
main.prototype.getSubscribeForm = function(data) {
    var str = '<form action="' + this.route_subscribe_handle + '" method="post"'+
        '<table>'+
        '<tr>'+
        '<td><label for="name">Name</label></td>'+
        '<td><input type="text" id="email" name="email" placeholder="Enter name"></td>'+
        '</tr><tr>'+
        '<td><label for="password">password</label></td>'+
        '<td><input type="text" id="password" name="password" placeholder="Enter Password"></td>'+
        '</tr>' +
        '</table>'+
        '<button type="submit">Subscribe</button>'+
        '</form>';
    return str;
}

main.prototype.getLoginForm = function() {
	var client_id = "testclientid";
    var client_secret = "testclientsecret";
    
    var str = '<form action="' + this.route_login_handle + '" method="post"'+
        '<table>'+
        '<tr>'+
        '<td><label for="username">Name</label></td>'+
        '<td><input type="text" id="email" name="email" placeholder="Enter name"></td>'+
        '</tr><tr>'+
        '<td><label for="password">password</label></td>'+
        '<td><input type="text" id="password" name="password" placeholder="Enter Password"></td>'+
        '</tr><tr>'+
        '<td><input type="hidden" id="client_id" placeholder="client_id" name="client_id" value="'+client_id+'"></td>'+
        '</tr><tr>'+
        '<td><input type="hidden" id="client_secret" placeholder="client_secret" name="client_secret" value="'+client_secret+'"></td>'+
        '</tr><tr>'+
        '<td><input type="hidden" id="grant_type" placeholder="grant_type" name="grant_type" value="password"></td>'+
        '</tr>' +
        '</table>'+
        '<button type="submit">Submit</button>'+
        '</form>';
    return str;
}

module.exports = main;
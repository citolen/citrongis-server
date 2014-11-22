function controller(route, handlerUrl) {
    
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
    this.handlerUrl = handlerUrl;

}

controller.prototype.createRoute = function(route) {
    this.routes["login"] = route + "/login";
    this.routes["login_handle"] = route + "/login_handle";
    console.log(this.routes["login"]);
}

controller.prototype.createUrl = function()  {
    for (var route in this.routes) {
	this.urls[route] = this.url + this.routes[route];
    }
}

controller.prototype.requireHtml = function() {
    this.html["loginForm"] = require("./html/loginForm.js")(this.urls);
}



controller.prototype.login = function(req, res) {    
    if (this.checkField(req.body) == false) {
	res.send("Error some fields are missing : " + missingFields.toString());
	return;
    }
    this.postLoginRequest(req.body, res, function(err) {
	if(err) {
	    console.log("Error : " + err);
	    res.end();
	}
    });
}

controller.prototype.postLoginRequest = function(data, res, callback) {
    var request = require('request');
    var authB64 = new Buffer(data.client_id + ":" + data.client_secret).toString('base64');
    var url = 'http://' + authB64 + '@localhost:8080/auth/login';
    var me = this;

    request.post({
	url: url,
	form: {
            grant_type: data.grant_type,
            username: data.email,
            password: data.password,
            client_id: data.client_id,
            client_secret: data.client_secret
        },
    }, function(err, res_data, body) {
	if (err)
	    return callback(err);

	var accessToken;
	var parsedBody;
	
        if (body) {
	    try {
		parsedBody = JSON.parse(body);
	    } catch (e) {
		return callback(e);
 	    }
        } else {
            return callback("body not found in answer");
        }
	
        if (parsedBody["access_token"])
            accessToken = parsedBody["access_token"];
        else {
            return callback("accesToken not found in answer");    
        }
	
	me.redirect(res, accessToken);
    });
}

controller.prototype.redirect = function(res, token) {   
    var request = require('request');
    var me = this;

    request.post({
        url: me.handlerUrl.post,
        form: { token: token }
    }, function(err, res_data, body) {
        if (err) {
	    console.log(err);
	    res.send(err);
	}
	res.send("Connected<br /><a href='" + me.handlerUrl.get + "'>return</a>");
    });
}

controller.prototype.checkField = function(data) {
    var missingFields = new Array;
    
    if (!data.client_id)
        missingFields.push("client_id")
    if (!data.client_secret)
        missingFields.push("client_secret");
    if (!data.grant_type)
        missingFields.push("grant_type");
    if (!data.email)
        missingFields.push("email");
    if (!data.password)
        missingFields.push("password");
    
    if (missingFields.length > 0) {
        return false;
    } else {
	return true;
    }
}

module.exports = controller;
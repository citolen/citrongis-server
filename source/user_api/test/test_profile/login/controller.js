function controller(route) {
    
    // Route
    this.routes = {};
    this.createRoute(route);
    
    // Url
    this.url = "http://192.168.56.101:8080";
    this.urls = {};
    this.createUrl();

    // Html
    this.html = {};
    this.requireHtml();

}

controller.prototype.createRoute = function(route) {
    this.routes["login"] = route + "/login";
    this.routes["login_handle"] = route + "/login_handle";
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
    var request = require('request');

    if (this.checkField(req.body) == false) {
	res.send("Error some fields are missing : " + missingFields.toString());
	return;
    }
/* A REVOIR
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
            parsedBody = JSON.parse(body);
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
*/
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
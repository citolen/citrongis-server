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
    this.routes["main"] = route;
}

controller.prototype.createUrl = function() {
   for(var route in this.routes) {
	this.urls[route] = this.url + this.routes[route];
    }
}

controller.prototype.requireHtml = function() {
    this.html["index"] = require("./html/index.js")(this.urls);
}

module.exports = controller;

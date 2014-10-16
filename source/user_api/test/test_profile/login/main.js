function main(app, route, handlerUrl) {
    this.initRoute(app, route, handlerUrl);
}

main.prototype.initRoute = function(app, route, handlerUrl) { 
    var router = new (require("./router.js"))(app, route, handlerUrl);
}

module.exports = main;
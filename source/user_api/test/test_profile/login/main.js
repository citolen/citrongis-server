function main(app, route) {
    this.initRoute(app, route);
}

main.prototype.initRoute = function(app, route) { 
    var router = new (require("./router.js"))(app, route);
}

module.exports = main;
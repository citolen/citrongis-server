function main(app, route) {
    this.name = "Profile";
    this.description = "Login, see & change you account informations";
    this.route = route + "/account";
    this.status = true;

    this.initRoute(app);
}

main.prototype.initRoute = function(app) {
    var router = new (require("./router.js"))(app, this.route);
}


module.exports = main;
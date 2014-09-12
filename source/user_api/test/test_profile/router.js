function router(app, route) {
    
    this.loginController = new (require("./login/main.js"))(app, route);

    this.controller = new (require("./controller.js"))(route);
    
    this.main(app, route);
    this.account(app, route);
}


router.prototype.main = function(app, route) {
    var me = this;

    app.get(route, function(req, res) {
	res.send(me.controller.html["index"]);
    });
}

router.prototype.account = function(app, route) {

}

module.exports = router
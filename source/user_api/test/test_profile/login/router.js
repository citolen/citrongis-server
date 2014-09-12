function router(app, route) {
    this.controller = new (require("./controller.js"))(route);
    
    this.loginRoute(app);
}

router.prototype.loginRoute = function(app) {
    var me = this;
    
    app.get(me.controller.routes["login"], function (req, res) {
	res.send(me.controller.html["loginForm"]);
    });

    app.post(me.controller.routes["login_handle"], function (req, res) {
	me.controller.login(req, res);
    });
}




module.exports = router;
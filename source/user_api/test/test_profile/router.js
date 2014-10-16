function router(app, route) {
    this.controller = new (require("./controller.js"))(route);
    
    this.loginController = new (require("./login/main.js"))(app, route, this.controller.getLoginHandler());
    
    this.main(app, route);
    this.account(app, route);
}


router.prototype.main = function(app, route) {
    var me = this;


    app.get(route, function(req, res) {
	res.send(me.controller.getIndex());
    });

    app.get(me.controller.routes["account"]/*, app.oauth.authorise()*/, function(req, res) {
	me.controller.getAccount(function (html) {
	    res.send(html);
	});
    });

    app.get(me.controller.routes["post_account"], function(req, res) {
	me.controller.post_account(function(data) {
	    res.send(data);
	});
    });

    app.post(me.controller.routes["account_handle"], function(req, res) {
	me.controller.account_run(req.body);
	res.send(req.body);
    });

    app.post(me.controller.routes["saveToken"], function(req, res) {
	me.controller.saveToken((req.body ? req.body : null));
	res.end();
    });
}

router.prototype.account = function(app, route) {

}

module.exports = router
function authRouter(app) {

    // Create controller instance
    this.authController = new (require("../controller/authController.js"))();

    // Init App
    app.oauth = this.authController.getOAuthOption();
    app.use(app.oauth.errorHandler());

    // Create route
    this.login(app);
    this.logout(app);
    this.subscribe(app);
}

authRouter.prototype.login = function(app) {
    var me = this;

    app.route("/auth/login")
	.all(function (req, res, next) {
	    console.log("Route : auth/login");    
	    next();
	})
	.get(function (req, res, next) {
	    answerGet(res);
	})
	.post(function (req, res, next) {
	    console.log("POST");
	    me.authController.login(req, res, next);
	})
}

authRouter.prototype.logout = function(app) {
    app.route("/auth/logout")
	.all(function (req, res, next) {
	    console.log("Route : auth/logout");    
	    next();
	})
	.get(function (req, res, next) {
	    answerGet(res);
	})
	.post(function (req, res, next) {
	    console.log("POST");
	})
}

authRouter.prototype.subscribe = function(app) {
    var me = this;
    app.route("/auth/subscribe")
	.all(function (req, res, next) {
	    console.log("Route : auth/subscribe");    
	    next();
	})
	.get(function (req, res, next) {
	    answerGet(res);
	})
	.post(function (req, res, next) {
	    console.log("POST");

	    me.authController.subscribe(req.body, function(err) {
		if (err) {
		    console.log(err);
		    res.send(err)
		} else {
		    res.send("Ok");
		}
	    });

	})
}

function answerGet(res) {
    console.log("GET");
    res.send("GET : OK");
}

module.exports = authRouter;
function authRouter(app) {

    // Create controller instance
    

    // Create route
    this.login(app);
    this.logout(app);
    this.subscribe(app);

}

authRouter.prototype.login = function(app) {
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
	})
}

function answerGet(res) {
    console.log("GET");
    res.send("GET : OK");
}

module.exports = authRouter;
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
	    console.log("ici");    
	})
	.get(function (req, res, next) {
	    console.log("ici");    
	})
	.post(function (req, res, next) {
	    console.log("ici");    
	})
}

authRouter.prototype.logout = function(app) {
    app.route("/auth/login")
	.all(function (req, res, next) {
	    
	})
	.get(function (req, res, next) {

	})
	.post(function (req, res, next) {

	})
}

authRouter.prototype.subscribe = function(app) {
    app.route("/auth/login")
	.all(function (req, res, next) {
	    
	})
	.get(function (req, res, next) {

	})
	.post(function (req, res, next) {

	})
}

module.exports = authRouter;
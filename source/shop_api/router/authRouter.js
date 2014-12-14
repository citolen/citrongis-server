var logger = require("../utility/logger.js");

function authRouter(app) {

    // Create controller instance

    // Get Function
    this.lock = require("../utility/lock.js");

    // Create route
    this.testAuth(app);
}

authRouter.prototype.testAuth = function(app) {
    var me = this;
 
    app.route("/testAuth")
	.all(function (req, res, next) {
	    console.log("Route : testAuth");
	    next();
	})
	.get(function (req, res, next) {
	})
	.post(function (req, res, next) {
		me.lock(req.headers, res, function(err , user_id) {
			if (err) {
				res.status(500);
				res.send(err);
			} else {
				logger.success();
				res.status(200);
				res.send(user_id);
			}
		});
	})
}

module.exports = authRouter;
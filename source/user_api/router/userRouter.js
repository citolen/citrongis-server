var logger = require("../utility/logger.js");

function userRouter(app) {
    // Create controller instance
    this.userController = new (require("../controller/userController.js"))();

    // Get functions
    this.lock = require('../utility/lock.js');
    this.userFromToken = require('../controller/authController.js').userFromToken;

    // Create route
    this.getUser(app);
 
}

userRouter.prototype.getUser = function(app) {
    var me = this;

    app.route("/user/getUser")
	.all(function (req, res, next) {
	    console.log("Route : getUser");    
	    next();
	})
	.get(function (req, res, next) {
	    answerGet(res);
	})
	.post(function (req, res, next) {
		//me.lock(app, req, res, function () {
			me.userController.getUser(req.body, function (err) {
				if (err) {
					res.status(500);
					res.send(err);
			    } else {
				    logger.success();
					res.status(200);
					res.send("Ok");
			    }
			});
		//});
	})
}

function answerGet(res) {
    console.log("GET");
    res.send("GET : OK");
}

module.exports = userRouter;
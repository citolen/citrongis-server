function accountRouter(app) {

    // Create controller instance
    this.accountController = new (require("../controller/accountController.js"))();

    // Get functions
    this.lock = require('../utility/lock.js');
    this.userFromToken = require('../controller/authController.js').userFromToken;

    // Create route
    this.getAccount(app);
    this.setAccount(app);
}

accountRouter.prototype.getAccount = function(app) {
    var me = this;
 
    app.route("/account/get")
	.all(function (req, res, next) {
	    console.log("Route : account/get");
	    next();
	})
	.get(function (req, res, next) {
	    me.lock(app, req, res, function () {
			me.userFromToken(req["headers"], function(err, user_id) {
				if (err) {
					res.status(500);
					res.send(err);
				} else {
					me.accountController.getAccount(user_id, req.body, function(err, data) {
						if (err) {
							res.status(500);
							res.send(err);
						} else {
							res.status(200);
							res.send(data);
						}
				    });
				}
			});
	    })
	})
	.post(function (req, res, next) {
	})
}

accountRouter.prototype.setAccount = function(app) {
    var me = this;
    
    app.route("/account/set")
	.all(function (req, res, next) {
	    console.log("Route : account/set");
	    next();
	})
	.get(function (req, res, next) {
	    answerGet(res);
	})
	.post(function (req, res, next) {
	    me.lock(app, req, res, function () {
			me.userFromToken(req["headers"], function(err, user_id) {
				if (err) {
					res.status(500);
					res.send(err);
				} else {
					me.accountController.setAccount(user_id, req.body, function (err) {
						if (err) {
							res.status(500);
				    		res.send(err);
						} else {
							res.status(200);
				    		res.end();
						}
					});   
				}
			});
	    });
	})
}

function answerGet(res) {
    console.log("GET");
    res.send("GET : OK");
}

module.exports = accountRouter;
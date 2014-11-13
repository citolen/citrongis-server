function accountRouter(app) {

    // Create controller instance
    this.accountController = new (require("../controller/accountController.js"))();

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
	    answerGet(res);
	})
	.post(function (req, res, next) {
	    require('../utility/lock.js')(app, req, res, function () {
		var userFromToken = require('../utility/userFromToken.js');
		userFromToken(req["headers"], function(user_id) {
		    me.accountController.getAccount(user_id, req.body, function(data) {
			res.send(data);
		    });
		});
	    })
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
	    require('../utility/lock.js')(app, req, res, function () {
		var userFromToken = require('../utility/userFromToken.js');
		userFromToken(req["headers"], function(user_id) {
		    me.accountController.setAccount(user_id, req.body);
		    res.status(200);
		    res.end();
		});
	    });
	})
}

function answerGet(res) {
    console.log("GET");
    res.send("GET : OK");
}

module.exports = accountRouter;
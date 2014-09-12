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
	    

/*----------------------------------------------------------------------*/

	    app.oauth.authorise()(req,res,function (err) {
		if (err) {
		    console.log(err);
		    res.send("Error : Token not found");
		    return;
		}
		else {
		    next();
		}
	    });

/*----------------------------------------------------------------------*/

	    
	})
	.get(function (req, res, next) {
	    answerGet(res);
	})
	.post(function (req, res, next) {
	    console.log("POST");
	    if (req["body"] && req.body["user_id"]) {
		var account = me.accountController.getAccount();
		res.send(account);
	    } else {
		res.send("Error missing user_id");
		console.log("Error missing user_id");
	    }
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
	    console.log("POST");
	    
	    if (req["body"] && req.body["account_change"])
		me.accountController.setAccount();
	    else {
		res.send("Error missing account_change data")
		console.log("Error missing account_change data");
	    }	
	})
}

function answerGet(res) {
    console.log("GET");
    res.send("GET : OK");
}

module.exports = accountRouter;
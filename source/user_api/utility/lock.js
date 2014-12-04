var logger = require("../utility/logger.js");

function lock(app, req, res, next) {
    app.oauth.authorise()(req,res,function (err) {
	if (err) {
		logger.error(err["message"]);
	    res.status(401);
	    res.send(err["message"]);
	    res.end();
	} else {
	    next();
	}
    });
}

module.exports = lock;
var logger = require("../utility/logger.js");

function lock(app, req, res, next) {
    app.oauth.authorise()(req,res,function (err) {
	if (err) {
		logger.error(err);
	    res.status(301);
	    res.end();
	} else {
	    next();
	}
    });
}

module.exports = lock;
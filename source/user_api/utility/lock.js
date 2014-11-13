function lock(app, req, res, next) {
    app.oauth.authorise()(req,res,function (err) {
	if (err) {
	    console.log(err);
	    res.status(301);
	    res.end();
	} else {
	    next();
	}
    });
}

module.exports = lock;
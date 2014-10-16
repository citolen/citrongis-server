function lock(app, req, res, next) {
    app.oauth.authorise()(req,res,function (err) {
	if (err) {
	    console.log(err);
	    res.send("Error : Token not found");
	} else {
	    next();
	}
    });
}

module.exports = lock;
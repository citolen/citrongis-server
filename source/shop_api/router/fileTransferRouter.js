var logger = require("../utility/logger.js");

function fileTransferRouter(app) {

    // Create controller instance
    this.fileTransferController = new (require("../controller/fileTransferController.js"))();

    // Get Function
    this.lock = require("../utility/lock.js");

    // Create route
    this.upload(app);
    this.download(app);
    this.getInfos(app);
    this.getExtension(app);
}

fileTransferRouter.prototype.upload = function(app) {
    var me = this;
 
    app.route("/upload")
	.all(function (req, res, next) {
	    console.log("Route : upload");
	    next();
	})
	.get(function (req, res, next) {
	})
	.post(function (req, res, next) {
		me.lock(req.headers, res, function(err , user_id) {
		    me.fileTransferController.upload(req, user_id, function(err) {
		    	if (err) {
		    		res.status(500);
					res.send(err);
		    	} else {
		    		logger.success();
		    		res.status(200);
		    		res.send("Ok");
		    	}
		    });
		});
	})
}

fileTransferRouter.prototype.download = function(app) {
    var me = this;
    
    app.route("/download")
	.all(function (req, res, next) {
	    console.log("Route : download");
	    next();
	})
	.get(function (req, res, next) {
		res.send("download");
	})
	.post(function (req, res, next) {
		me.lock(req.headers, res, function(err , user_id) {
			me.fileTransferController.download(req.body, res, user_id, function(err) {
				if (err) {
					res.status(500);
					res.send(err);
				} else {
					logger.success();
			    	res.status(200);
		    		res.send("Ok");
				}
			});
		});
	})
}

fileTransferRouter.prototype.getInfos = function(app) {
    var me = this;
    
    app.route("/ext/getInfos")
	.all(function (req, res, next) {
	    console.log("Route : ext/getInfos");
	    next();
	})
	.get(function (req, res, next) {
		res.send("ext/getInfos");
	})
	.post(function (req, res, next) {
		me.lock(req.headers, res, function(err , user_id) {
			me.fileTransferController.getInfos(req.body, function(err, result) {
				if (err) {
					res.status(500);
					res.send(err);
				} else {
					logger.success();
			    	res.status(200);
		    		res.send(result);
				}
			});
		});
	})
}

fileTransferRouter.prototype.getExtension = function(app) {
	var me = this;

    app.route("/ext/getExt")
	.all(function (req, res, next) {
	    console.log("Route : ext/getExtension");    
	    next();
	})
	.get(function (req, res, next) {
	    res.send("ext/getExtension");
	})
	.post(function (req, res, next) {
		me.lock(req.headers, res, function(err , user_id) {
			me.fileTransferController.getExt(req.body, function (err, data) {
				if (err) {
					res.status(500);
					res.send(err);
			    } else {
				    logger.success();
					res.status(200);
					res.send(data);
			    }
			});
		});
	})
}

module.exports = fileTransferRouter;
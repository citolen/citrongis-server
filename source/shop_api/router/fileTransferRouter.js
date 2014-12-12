function fileTransferRouter(app) {

    // Create controller instance
    this.fileTransferController = new (require("../controller/fileTransferController.js"))();

    // Get Function
    this.lock = require("../utility/lock.js");

    // Create route
    this.upload(app);
    this.download(app);
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
	    me.fileTransferController.upload(req, function(err) {

	    });
	    res.send();
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
	})
}

module.exports = fileTransferRouter;
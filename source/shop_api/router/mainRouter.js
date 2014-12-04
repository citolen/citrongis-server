function mainRouter(app) {
    this.initRouters(app);
}

mainRouter.prototype.initRouters = function(app) {
	var fileTransferRouter = new (require('./fileTransferRouter.js'))(app);
	var authRouter = new (require('./authRouter.js'))(app);
}

module.exports = mainRouter;
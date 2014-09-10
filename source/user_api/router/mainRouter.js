function mainRouter(app) {

    this.initRouters(app);
}

mainRouter.prototype.initRouters = function(app) {
    var authRouter = new (require('./authRouter.js'))(app);
}

module.exports = mainRouter;
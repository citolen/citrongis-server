function mainRouter(app) {

    this.initRouters(app);
}

mainRouter.prototype.initRouters = function(app) {
    var authRouter = new (require('./AuthRouter/authRouter.js'))(app);
}

module.exports = mainRouter;
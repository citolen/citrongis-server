function mainRouter(app) {
    this.initRouters(app);
}

mainRouter.prototype.initRouters = function(app) {
    var authRouter = new (require('./authRouter.js'))(app);
    var accountRouteur = new (require('./accountRouter.js'))(app);
    var userRouter = new (require('./userRouter.js'))(app);
}

module.exports = mainRouter;
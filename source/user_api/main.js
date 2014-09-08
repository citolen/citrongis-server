function main() {
    //get express instance
    var app = getExpressInstance();

    //init unit test
    

    //init router
    initRouters(app);
}

function initRouters(app) {
    var mainRouter = new (require('./router/mainRouter.js'))(app);
}

function getExpressInstance() {
    var app = require('express')();
    var bodyParser = require('body-parser');

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    app.listen(8080);

    return app;
}

main();
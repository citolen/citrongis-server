function main() {
    //get express instance
    var app = getExpressInstance();

    //init router
    initRouters(app);
    
    //init unit test
    var testManager = new (require("./test/testManager.js"))(app);
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
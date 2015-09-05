var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var oauthserver = require('node-oauth2-server');
var debug = require('debug')('ApiCitronGIS');
var cors = require('express-cors');
require('coffee-script/register');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

var oauth_model = require('./routes/models/oauth_model');
var oauth_configuration = {
    model: oauth_model,
    grants: ['password', 'refresh_token'],
    debug: false,
    accessTokenLifetime: 3600
};

if (app.get('env') === 'development') {
    // Print body
    app.use(function (req, res, next) {
        debug(req.body);
        next();
    });
    // Set Oauth debug on
    oauth_configuration.debug = true;
}

// Set up Oauth
app.oauth = oauthserver(oauth_configuration);

// Begin public routes
app.all('/auth/login', function (req, res, next) {
    req.header('Content-Type', 'application/x-www-form-urlencoded');
    next();
}, function (req, res, next) {
    // Pas beau tout moche, a remplacer
    if (req.headers['content-type']) {
        req.headers['content-type'] = req.headers['content-type'].toLowerCase().replace('application/json', 'application/x-www-form-urlencoded');
    }
    next();
}, oauth_model.detectIP, app.oauth.grant());
app.use('/auth', require('./routes/public_users'));
// End public routes

// Ask autorisation
app.use(app.oauth.authorise());
app.use(require('./routes/accounts').completMyInformation);

// Download
app.use(express.static(path.join(__dirname, 'public')));

// Begin private routes
app.use('/account', require('./routes/accounts'));
app.use('/users', require('./routes/users'));
app.use('/extensions', require('./routes/extensions'));
// End private routes

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
app.use(app.oauth.errorHandler());

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        console.log("Errors", err);
        res.send({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send({ message: "An error occured" });
});

var e = require('./routes/db_models/extension');

module.exports = app;

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var oauthserver = require('node-oauth2-server');
var debug = require('debug')('ApiCitronGIS');
require('coffee-script/register');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(require('stylus').middleware(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'public')));

var oauth_model = require('./routes/models/oauth_model');
app.oauth = oauthserver({
    model: oauth_model,
    grants: ['password'],
    debug: true
});

// Print body
if (app.get('env') === 'development') {
    app.use(function (req, res, next) {
        debug(req.body);
        next();
    });
}

// Begin public routes
app.all('/auth/login', oauth_model.detectIP, app.oauth.grant());
app.use('/auth', require('./routes/public_users'));
// End public routes

// Ask autorisation
app.use(app.oauth.authorise());
app.use(require('./routes/accounts').completMyInformation);

// Download
app.use(express.static(path.join(__dirname, 'public')));

// Upload -> Uniquement route upload
//app.use(multer({ dest: './public/uploads/' }));

// Begin private routes
app.use('/account', require('./routes/accounts'));
app.use('/users', require('./routes/users'));
// End private routes

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

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


module.exports = app;

var logger = require("../utility/logger.js");

function authController() {
    this.userManager = require("../manager/userManager.js");
    this.accessTokenManager = require('../manager/accessTokenManager.js');


    this.oauthOption = null;

    this.createOAuthOption();
}

authController.prototype.createOAuthOption = function() {
    var oauthserver = require('oauth2-server');

    this.oauthOption = oauthserver({
	model: require("../model/authLogin.js"),
	grants: ['password'],
	debug : false
    });
}

authController.prototype.getOAuthOption = function() {
    return this.oauthOption;
}

authController.prototype.login = function(req, res, next, callback) {
    var func = this.oauthOption.grant();

    if (func && func != null) {
	   func(req, res, next);
    } else {
        var err = "Can't find function grant.login";
        logger.internalError(err);
        callback(err);
    }
}

authController.prototype.subscribe = function(data, callback) {
    var me = this;

    if (data["email"] && data["password"]) {
	   this.userManager.createNewUser(data["email"], data["password"], callback);
    } else {
       var err = "missing value : " + (data["email"] ? "" : "email") + " " + (data["password"] ? "" : "password");
	   logger.error(err);
       callback(err);
    }
}

authController.userFromToken = function(header, callback) {
    var accessTokenManager = require('../manager/accessTokenManager.js');
    if (header) {
        if (header["authorization"]) {
            var token = header["authorization"].replace("Bearer ", "");
            accessTokenManager.getWithId(token, function(err, result) {
                callback(err, result.userId);
            });
        } else {
            var err = "Missing authorization information";
            logger.error(err);
            callback(err, null);
        }
    } else {
        var err = "Header is missing";
        logger.error(err);
        callback(err, null);
    }
    
}

module.exports = authController;
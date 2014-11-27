var logger = require("../utility/logger.js");

function authController() {
    this.userManager = require("../manager/userManager.js");

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

module.exports = authController;
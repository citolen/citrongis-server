function authController() {
    this.userManager = require("../manager/userManager.js");
    this.userModel = require("../model/user.js"); // TO REMOVE
    this.loginModel = require("../model/authLogin.js");
    this.crypter = require("../utility/crypter.js");

    this.oauthOption = null;

    this.createOAuthOption();
}

authController.prototype.createOAuthOption = function() {
    var oauthserver = require('oauth2-server');

    this.oauthOption = oauthserver({
	model: this.loginModel,
	grants: ['password'],
	debug : false
    });
}

authController.prototype.getOAuthOption = function() {
    return this.oauthOption;
}

authController.prototype.login = function(req, res, next) {
    var func = this.oauthOption.grant();

    if (func != null)
	func(req, res, next);
    else
	console.log("Internal error : Function not found : Grant.login");
}

authController.prototype.subscribe = function(data, callback) {
    var user = new this.userModel();
    var me = this;

    this.userManager.checkExistingUserName(data["email"], function(isOk) {
        if (isOk) {
            require("../utility/checkPassword.js")(data["password"], function (err, password_validation) {
                if (password_validation) {
                    me.crypter.hash(data["password"], function(err, password) {
                        if (err)
                            console.log(err);
                        if (data["email"] && data["password"]) {
                            user.data.authInfo.email = data["email"];
                            user.data.authInfo.password = password;
                            user.save(callback);
                        } else {
                            callback("Error : Missing data");
                        }
                    });
                } else {
                    callback(err)
                }
            }); 
        } else {
            callback("User with this username : \"" + data["email"] + "\" already exist in database");
        }
    });
}

module.exports = authController;
function authController() {
    this.userModel = require("../model/user.js");
    this.loginModel = require("../model/authLogin.js");

    this.oauthOption = null;

    this.createOAuthOption();
}

authController.prototype.createOAuthOption = function() {
    var oauthserver = require('oauth2-server');

    this.oauthOption = oauthserver({
	model: this.loginModel,
	grants: ['password'],
	debug : true
    });
}

authController.prototype.getOAuthOption = function() {
    return this.oauthOption;
}

authController.prototype.logout = function() {

}

authController.prototype.subscribe = function(data, callback) {
    var user = new this.userModel();

    if (data["email"] && data["password"]) {
	user.data.authInfo.email = data["email"];
	user.data.authInfo.password = data["password"];
	user.save(callback);
    } else {
	callback("Error : Missing data");
    }
}

module.exports = authController;
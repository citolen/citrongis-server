function authController() {
    this.userModel = require("../model/user.js");
    
    this.oauthOption = null;

    this.createOAuthOption();
    
    this.init();
}

authController.prototype.init = function() {
    
}

authController.prototype.createOAuthOption = function() {
    var oauthserver = require('oauth2-server');

    this.ouathOption = oauthserver({
	model: module.exports,
	grants: ['password'],
	debug : true
    });
}

authController.prototype.getOAuthOption = function() {
    return this.oauthOption;
}

authController.prototype.login = function(oauth) {
    this.oauthOption.grant();
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
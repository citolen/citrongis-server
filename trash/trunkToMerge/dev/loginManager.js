function loginManager(app) {
	this.app = app;
	this.User = require("./model/user.js");
	this.loginModel = module.exports;
	this.init();
}

loginManager.prototype.init = function () {
	var oauthserver = require('oauth2-server');

	this.initLoginModel();	

	this.app.oauth = oauthserver({
	    model: this.loginModel,
	    grants: ['password'],
	    debug : true
	});

	this.app.all('/oauth/token', this.app.oauth.grant());
	this.app.use(this.app.oauth.errorHandler());
}

loginManager.prototype.subscribe = function (data) {
	var user = new this.User();

	user.data.authInfo.email = data.name;
	user.data.authInfo.password = data.password;

	user.save(function() {});
}

loginManager.prototype.initLoginModel = function() {
	var accessTokenModel = require("./model/authAccessToken.js");
	var clientModel = require("./model/authClient.js");
	var me = this;


	this.loginModel.getAccessToken = function (bearerToken, callback) {
    	console.log('in getAccessToken (bearerToken: ' + bearerToken + ')');
    	accessTokenModel.findOne({ accessToken: bearerToken }, callback);
	};

	this.loginModel.getClient = function (clientId, clientSecret, callback) {
		console.log('in getClient (clientId: ' + clientId + ', clientSecret: ' + clientSecret + ')');
		if (clientSecret === null) 
		{
			return clientModel.findOne({ clientId: clientId }, callback);
		}
		clientModel.findOne({ clientId: clientId, clientSecret: clientSecret }, callback);
	};

	var authorizedClientIds = ['testclientid']; //to search in base
	this.loginModel.grantTypeAllowed = function (clientId, grantType, callback) {
		console.log('in grantTypeAllowed (clientId: ' + clientId + ', grantType: ' + grantType + ')');
		
		if (grantType === 'password') 
		{
			return callback(false, authorizedClientIds.indexOf(clientId) >= 0);
		}
		callback(false, true);
	};

	this.loginModel.saveAccessToken = function (token, clientId, expires, userId, callback) {
		console.log('in saveAccessToken (token: ' + token + ', clientId: ' + clientId + ', userId: ' + userId + ', expires: ' + expires + ')');
		

		var accessToken = new accessTokenModel();
		accessToken.data.accessToken = token;
		accessToken.data.clientId = clientId;
		accessToken.data.userId = userId;
		accessToken.data.expires = expires;

		accessToken.save(callback);
	};
	this.loginModel.getUser = function (username, password, callback) {
		console.log('in getUser (username: ' + username + ', password: ' + password + ')');
		me.User.findOne({ 'authInfo.email': username, 'authInfo.password': password }, function(err, user) {
			if(err) {
				return callback(err);
			}
			callback(null, user.id);
		});
	};

}

module.exports = loginManager;

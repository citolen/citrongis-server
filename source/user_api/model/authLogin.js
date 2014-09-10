var authLogin = module.exports;

var accessTokenModel = require("./authAccessToken.js");
var clientModel = require("./authClient.js");
var userModel = require("./user.js");

var authorizedClientIds = ['testclientid']; //to search in base

authLogin.getAccessToken = function (bearerToken, callback) {
    console.log('in getAccessToken (bearerToken: ' + bearerToken + ')');
    accessTokenModel.findOne({ accessToken: bearerToken }, callback);
};

authLogin.getClient = function (clientId, clientSecret, callback) {
    console.log('in getClient (clientId: ' + clientId + ', clientSecret: ' + clientSecret + ')');
    if (clientSecret === null) 
    {
	return clientModel.findOne({ clientId: clientId }, callback);
    }
    clientModel.findOne({ clientId: clientId, clientSecret: clientSecret }, callback);
    };


authLogin.grantTypeAllowed = function (clientId, grantType, callback) {
    console.log('in grantTypeAllowed (clientId: ' + clientId + ', grantType: ' + grantType + ')');
    return callback(false, authorizedClientIds.indexOf(clientId) >= 0);
};

authLogin.saveAccessToken = function (token, clientId, expires, userId, callback) {
    console.log('in saveAccessToken (token: ' + token + ', clientId: ' + clientId + ', userId: ' + userId + ', expires: ' + expires + ')');
    
    
    var accessToken = new accessTokenModel();
    accessToken.data.accessToken = token;
    accessToken.data.clientId = clientId;
    accessToken.data.userId = userId;
    accessToken.data.expires = expires;
    
    accessToken.save(callback);
};

authLogin.getUser = function (username, password, callback) {
    console.log('in getUser (username: ' + username + ', password: ' + password + ')');
    userModel.findOne({ 'authInfo.email': username, 'authInfo.password': password }, function(err, user) {
	if(err) {
	    return callback(err);
	}
	callback(err, user.id);
    });
};

module.exports = authLogin;
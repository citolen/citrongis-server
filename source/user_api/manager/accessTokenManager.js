function accessTokenManager() {
    
}

// ERROR CHECK
accessTokenManager.getWithId = function(token, callback) {
    accessTokenModel = require("../model/authAccessToken.js");

    accessTokenModel.findOne({'accessToken' : token}, function (err, result) {
		callback(err, result);
    })
}


module.exports = accessTokenManager;

var Schema = require("./Schema/schema.js");

var authAccessToken = Schema.define('authAccessToken', {
    accessToken : String,
    clientId : String,
    clientSecret : String,
    userId : String,
    expires : Date
});

authAccessToken.prototype.init = function() {
};

module.exports = authAccessToken;
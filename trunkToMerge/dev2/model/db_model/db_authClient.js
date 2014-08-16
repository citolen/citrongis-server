var Schema = require("./Schema/schema.js");

var authClient = Schema.define('authClient', {
		clientId : String,
		clientSecret : String,
		redirectUri : String
});

authClient.prototype.init = function() {
};

module.exports = authClient;
var Schema = require("./Schema/schema.js");

var User = Schema.define('User', {
		authInfo : Object,
		userInfo : Object,
		accountInfo : Object,
		groupInfo : Object,
		applications : Object
});

User.prototype.init = function() {
	this.authInfo = {
		email : null,
		password : null
	};

	this.userInfo = {
		firstName : null,
		lastName : null,
		dateOfBirth : null,
		language : null,
		profileType : null,
		contact : {
			email : 		null,
			phoneNumber : 	null,
			location : 		null
		},
		picture : null,
		job : {
			status : null,
			compagny : {
				name : null,
				location : null
			}
		}
	};

	this.accountInfo = {
		creationDate : null
	};

	this.groupInfo = [];

	this.applications = [];
};

module.exports = User;
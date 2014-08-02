var Schema = require("./Schema/schema.js");

var Extensions = Schema.define('Extensions', {
        isAvailable : Boolean,
		informations : Object,
		contact : Object,
		storeInformations : Object,
		dependencies : Object,
		accessInformation : Object
});

Extensions.prototype.init = function() {
	this.isAvailable = false;

	this.informations = {
		name : 			null,
		description : 	null,
		version : 		null,
		date : {
			creationDate : 	null,
			lastUpload : 	null
		},
		owner : null,
		screenShoot : {
			picture : 		null,
			description : 	null
		},
		minClientVersion : null
	};

	this.contact = {
		email : 		null,
		phoneNumber : 	null,
		location : 		null
	};

	this.storeInformations = {
		fileSystem : {
			path : 		null
		},
		file : {
			filename : 	null,
			size : 		null,
			type : 		null
		}
	};

	this.dependencies = []

	this.accessInformation = {
		isPrivate : false,
		allowedGroups : []
	};
};

module.exports = Extensions;
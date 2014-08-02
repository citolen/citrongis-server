var Extension = require("./model/extension.js");
var User = require("./model/user.js");

main();

function main() {
	var ext = new Extension();

	ext.data.informations.name = "geoMap";
	ext.data.isAvailable = true;
	ext.save();
	

	var user = new User();
	user.data.userInfo.firstName = "nicolas";
	
	user.save();

	ext.data.informations.owner = user.data;
	ext.save();

}
function userManager() {
    
}

// ERROR CHECK
userManager.getWithId = function(id, callback) {
    userModel = require("../model/user.js");

    userModel.findOne({'id' : id}, function (err, result) {
	var user = new userModel();

	user.setData(result);
	callback(user);
    })
}

	userManager.checkExistingUserName = function(username, callback) {
		userModel = require("../model/user.js");

		userModel.have({ 'authInfo.email': username}, function(result) {
			console.log("result : " + result);
			console.log("!result : " + !result);
			callback(!result);
		});
	}


module.exports = userManager;

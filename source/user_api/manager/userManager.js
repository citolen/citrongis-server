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


module.exports = userManager;

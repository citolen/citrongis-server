var logger = require("../utility/logger.js");

function userController() {
    this.userManager = require('../manager/userManager.js');

}

userController.prototype.getUser = function(data, callback) {
	var me = this;

	if(data && data["search"]) {
		if (Object.keys(data["search"]).length > 0) {
			var filters = me.getSearchObject(data["search"]);
			if (filters != null) {
				me.userManager.findAll(filters, function(err, user_list) {
					if (err) {
						callback(err);
					} else {
						var accountController = new (require("./accountController.js"))();
						var dataToSend = [];
						for(var index in user_list) {
							if (!data["keys"] || Object.keys(data["keys"]).length == 0) {
				    			var result = accountController.getAllAccount(user_list[index]);
				    		} else {
					    		var result = accountController.switchDataGET(user_list[index], data["keys"]);
					    		if (result == null) {
					    			var err = "Invalid key for account";
									logger.error(err);
									callback(err, null);
								}
							}
							dataToSend.push(result);
						}
						callback(err, dataToSend);
					}
				});
			} else {
				var err = "Invalid key for account";
				logger.error(err);
				callback(err);
			}
		} else {
			var err = "Missing data (search filters is empty)";
			logger.error(err);
			callback(err);
		}
	} else {
		var err = "Missing data (needed : search)";
		logger.error(err);
		callback(err);
	}
}

userController.prototype.getSearchObject = function(data) {
	var result= {};
    
    for (var key in data) {
		switch (key) {
		case "authInfo_email":
		    result["authInfo.email"] = new RegExp(data[key]);
		    break;
		case "authInfo_password":
		    result["authInfo.password"] = new RegExp(data[key]);
		    break;
		case "userInfo_firstName":
		    result["userInfo.firstName"] = new RegExp(data[key]);
		    break;
		case "userInfo_lastName":
		    result["userInfo.lastName"] = new RegExp(data[key]);
		    break;
		case "userInfo_dateOfBirth":
		    result["userInfo.dateOfBirth"] = new RegExp(data[key]);
		    break;
		case "userInfo_language":
		    result["userInfo.language"] = new RegExp(data[key]);
		    break;
		case "userInfo_profileType":
		    result["userInfo.profileType"] = new RegExp(data[key]);
		    break;
		case "userInfo_picture":
		    result["userInfo.picture"] = new RegExp(data[key]);
		    break;
		case "userInfo_contact_email":
		    result["userInfo.contact.email"] = new RegExp(data[key]);
		    break;
		case "userInfo_contact_phoneNumber":
		    result["userInfo.contact.phoneNumber"] = new RegExp(data[key]);
		    break;
		case "userInfo_contact_location":
		    result["userInfo.contact.location"] = new RegExp(data[key]);
		    break;
		case "userInfo_job_status":
		    result["userInfo.job.status"] = new RegExp(data[key]);
		    break;
		case "userInfo_job_company_name":
		    result["userInfo.job.company.name"] = new RegExp(data[key]);
		    break;
		case "userInfo_job_company_location":
		    result["userInfo.job.company.location"] = new RegExp(data[key]);
		    break;
		case "accountInfo_creationDate":
		    result["accountInfo.creationDate"] = new RegExp(data[key]);
		    break;
		default :
			return null;
		}
    }
    return result;
}

module.exports = userController;

function accountController() {
    this.userManager = require('../manager/userManager.js');
}

accountController.prototype.setAccount = function(user_id, new_data) {
    var me = this;
    
    this.userManager.getWithId(user_id, function(user) {	
	user = me.switchDataSET(user, new_data);
	user.save(function () {});
    });
}

accountController.prototype.getAccount = function(user_id, new_data, callback) {
    var me = this;
    
    this.userManager.getWithId(user_id, function(user) {	
	var result = me.switchDataGET(user, new_data);
	callback(result);
    });
}


/*
** This part of code have to be reworked
*/
accountController.prototype.switchDataSET = function(user, data) {
    for (var key in data) {
	switch (key) {
	case "authInfo_email":
	    user.data.authInfo.email = data[key];
	    break;
	case "authInfo_password":
	    user.data.authInfo.password = data[key];
	    break;
	case "userInfo_firstName":
	    user.data.userInfo.firstName = data[key];
	    break;
	case "userInfo_lastName":
	    user.data.userInfo.lastName = data[key];
	    break;
	case "userInfo_dateOfBirth":
	    user.data.userInfo.dateOfBirth = data[key];
	    break;
	case "userInfo_language":
	    user.data.userInfo.language = data[key];
	    break;
	case "userInfo_profileType":
	    user.data.userInfo.profileType = data[key];
	    break;
	case "userInfo_picture":
	    user.data.userInfo.picture = data[key];
	    break;
	case "userInfo_contact_email":
	    user.data.userInfo.contact.email = data[key];
	    break;
	case "userInfo_contact_phoneNumber":
	    user.data.userInfo.contact.phoneNumber = data[key];
	    break;
	case "userInfo_contact_location":
	    user.data.userInfo.contact.location = data[key];
	    break;
	case "userInfo_job_status":
	    user.data.userInfo.job.status = data[key];
	    break;
	case "userInfo_job_company_name":
	    user.data.userInfo.job.compagny.name = data[key];
	    break;
	case "userInfo_job_company_location":
	    user.data.userInfo.job.compagny.location = data[key];
	    break;
	case "accountInfo_creationDate":
	    user.data.accountInfo.creationDate = data[key];
	    break;
	}
    }
    return user;
}

accountController.prototype.switchDataGET = function(user, data) {
    var result= {};
    
    for (var key in data) {
	switch (key) {
	case "authInfo_email":
	    result[key] = user.data.authInfo.email;
	    break;
	case "authInfo_password":
	    result[key] = user.data.authInfo.password;
	    break;
	case "userInfo_firstName":
	    result[key] = user.data.userInfo.firstName;
	    break;
	case "userInfo_lastName":
	    result[key] = user.data.userInfo.lastName;
	    break;
	case "userInfo_dateOfBirth":
	    result[key] = user.data.userInfo.dateOfBirth;
	    break;
	case "userInfo_language":
	    result[key] = user.data.userInfo.language;
	    break;
	case "userInfo_profileType":
	    result[key] = user.data.userInfo.profileType;
	    break;
	case "userInfo_picture":
	    result[key] = user.data.userInfo.picture;
	    break;
	case "userInfo_contact_email":
	    result[key] = user.data.userInfo.contact.email;
	    break;
	case "userInfo_contact_phoneNumber":
	    result[key] = user.data.userInfo.contact.phoneNumber;
	    break;
	case "userInfo_contact_location":
	    result[key] = user.data.userInfo.contact.location;
	    break;
	case "userInfo_job_status":
	    result[key] = user.data.userInfo.job.status;
	    break;
	case "userInfo_job_company_name":
	    result[key] = user.data.userInfo.job.compagny.name;
	    break;
	case "userInfo_job_company_location":
	    result[key] = user.data.userInfo.job.compagny.location;
	    break;
	case "accountInfo_creationDate":
	    result[key] = user.data.accountInfo.creationDate;
	    break;
	}
    }
    return result;
}

module.exports = accountController;

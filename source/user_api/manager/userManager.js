var logger = require("../utility/logger.js");

function userManager() {
    
}

userManager.createNewUser = function (email, password, callback) {
    var me = this;
    var checkPassword = require("../utility/checkPassword.js");
    var hashPassword = require("../utility/crypter.js").hash;

    this.checkExistingUserName(email, function(isOk) {
        if (isOk) {
            checkPassword(password, function (err, isValid) {
                if (isValid) {
                    hashPassword(password, function(err, password_hash) {
                        if (err) {
                           callback(err);
                        } else {
                            me.createUser(email, password_hash, callback);
                        }    
                    });
                } else {
                    callback(err);
                }
            }); 
        } else {
            var err = "User with this username : \"" + email + "\" already exist";
            logger.error(err);
            callback(err);
        }
    });
}

userManager.createUser = function (email, password, callback) {
    var user = new (require("../model/user.js"))();

    user.data.authInfo.email = email;
    user.data.authInfo.password = password;
    user.save(callback);
}

// ERROR CHECK
userManager.getWithId = function(id, callback) {
    var userModel = require("../model/user.js");

    userModel.findOne({'id' : id}, function (err, result) {
        if (err) {
            callback(err, null);
        } else {
            var user = new userModel();
            user.setData(result);
            callback(err, user);
        }
    })
}

userManager.checkExistingUserName = function(username, callback) {
    userModel = require("../model/user.js");
    
    userModel.have({ 'authInfo.email': username}, function(result) {
	   callback(!result);
    });
}

userManager.findAll = function(filters, callback) {
    userModel = require("../model/user.js");

    userModel.find(filters, function(err , results) {
        if (err) {
            callback(err, null);
        } else {
            var users_list = [];
            for (var key in results) {
                var user = new userModel();
                user.setData(results[key])
                users_list.push(user);
            }
            callback(null, users_list);
        }
     })
}

module.exports = userManager;

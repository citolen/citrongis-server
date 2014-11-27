var logger = require("../utility/logger.js");

function checkPassword(password, callback) {
    var isvalid = true;
    
    if (!password)
	   callback("", false);

    if (password.length < 8)
	   isvalid = false;

    if (isvalid)
	    callback(null, isvalid);
    else {
        var err = "Invalid password";
        logger.error(err);
        callback(err, isvalid);
    } 
}

module.exports = checkPassword;
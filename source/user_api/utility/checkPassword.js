function checkPassword(password, callback) {
	var isvalid = true;
	var err = "";

	if (password.length < 8) {
		err = err + "Password's length should be more than 8 character";
		isvalid = false;
	}
	if (isvalid)
		callback(null, isvalid);
	else
		callback(err, isvalid);
}

module.exports = checkPassword;
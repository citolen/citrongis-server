var DB_Extension = require('./db_model/db_extension.js');

function Extension () {
	this.data = new DB_Extension();
	this.data.init();
}


Extension.prototype.save = function () {
	this.data.save(function(err, result) {
		if (err)
			console.log("error : " + err);
	});
}

Extension.prototype.debug = function () {
	console.log(this.data);
}

module.exports = Extension;
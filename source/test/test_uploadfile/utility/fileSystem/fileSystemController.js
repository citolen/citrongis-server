function fileSystemController() {
	this.fs = require('fs');
}

fileSystemController.prototype.createPath = function(path) {
	var dirArray = path.split("/");
	var tmppath = "";

	for (var i = 0; i < dirArray.length; i++)						// For each directory in the path
	{																// Check if the directory exist
		if (!this.fs.existsSync("/" + tmppath + dirArray[i])) {		// 		if true -> add this directory to the tmppath
			this.fs.mkdirSync("/" + tmppath + dirArray[i])			//		else -> create it and add the the tmppath
		}															
		if (dirArray[i] != "")										
			tmppath += dirArray[i] + "/";							
	}
};

fileSystemController.prototype.move = function (oldpath, newpath) {
	this.fs.rename(oldpath, newpath, function (err) {
		if (err) {
			console.log(err);
			throw err;
		}
	});
}

module.exports = fileSystemController;
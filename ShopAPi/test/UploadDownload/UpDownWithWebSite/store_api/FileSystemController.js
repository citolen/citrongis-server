function FileSystemController() {
	this.fs = require('fs');
	this.nodefs = require('node-fs');
}

/*
** Check if a path exist
*/
FileSystemController.prototype.exist = function(path) {
	if (this.fs.existsSync(path))
		return true;
	return false;
}

/*
** Create a full path
*/
FileSystemController.prototype.createPath = function (path) {
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
}

/*
** Move file from oldpath to newpath
*/
FileSystemController.prototype.move = function (oldpath, newpath, callback) {
	this.fs.rename(oldpath, newpath, function (err) {
		if (err) {
			console.log(err);
			throw err;
		}
		callback();
	});
}

module.exports = FileSystemController;
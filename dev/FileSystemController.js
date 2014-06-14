function FileSystemController() {
	this.fs = require('fs');
	this.nodefs = require('node-fs');
	this.uploadDir = __UploadDir__;

	if (!this.fs.existsSync(this.uploadDir)) {
			this.fs.mkdirSync(this.uploadDir);
	}
}

FileSystemController.prototype.createPath = function (path) {
	var dirArray = path.split("/");
	var tmppath = "";

	for (var i = 0; i < dirArray.length; i++)
	{
		console.log("je doit creer : " +  dirArray[i]);
		console.log("le passe complet a check est : " + this.uploadDir + "/" + tmppath + dirArray[i]);
		if (!this.fs.existsSync(this.uploadDir + "/" + tmppath + dirArray[i])) {
			this.fs.mkdirSync(this.uploadDir + "/" + tmppath + dirArray[i])
		}
		tmppath += dirArray[i] + "/";
	}
}

module.exports = FileSystemController;
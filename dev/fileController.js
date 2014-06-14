function fileController(callback) {
	var FileCollection_Class = require('./FileCollection');
	var FileSystemController_class = require('./FileSystemController.js');

	this.FileSystemController = new FileSystemController_class();
	this.FileCollection = new FileCollection_Class(callback);
}

fileController.prototype.check = function(file, callback) {
	// Check if file is valide
	// need to be completed

	if (file.length > 1)
		callback(false);
	callback(true);
}

fileController.prototype.store = function(file, data, callback) {
	var _me = this;
	var ext = new (require('./Extenssion.js'))();

	ext.fromRequest(file, data);

	this.FileCollection.exist(ext, function(exist) {
		if (exist) {
				console.log("file already exist");
		} else {
			var path = "";
			var pathtmp = ""

			var versionArray = ext.version.split(".");

			for (var i = 0; i < versionArray.length; i++) {
				pathtmp = (pathtmp == "" ? "v" : pathtmp + ".") + versionArray[i];
				path += pathtmp + "/";
			}

			console.log(path);

			_me.FileSystemController.createPath(path); //create path for this version
	/*		_me.FileSystemController.move(ext.path, path, function(err) { //move file to the nw location
				if (err) { 
					console.log(err);
					return;
				} 						// if move works
				ext.path = path;		//change path member of the file
				this.FileCollection.add(ext, function () { // add this file in DB
		
				});
			});
*/
		}
	});

	
}

module.exports = fileController;
function fileController(callback) {
	var FileCollection_Class = require('./FileCollection');
	var FileSystemController_class = require('./FileSystemController.js');

	this.uploadDir = __UploadDir__;

	this.FileSystemController = new FileSystemController_class();
	this.FileSystemController.createPath(this.uploadDir);
	
	this.FileCollection = new FileCollection_Class(callback);
}


/*
** Check the file validity
*/
fileController.prototype.check = function(file, callback) {
	/*
	** Here we can check the size, the name, the extenssion, the content, ...
	*/
	if (file.length > 1)
		callback(false);
	callback(true);
}

/*
** Store the file in Filesystem and in DB
*/
fileController.prototype.store = function(file, data, callback) {
	var _me = this;
	var ext = new (require('./Extenssion.js'))();

	ext.fromRequest(file, data);

	this.FileCollection.exist(ext, function(exist) {
		if (exist) {
				console.log("file already exist");
				callback();
		} else {


			/*
			** Create path from the version and the extension name.
			**	Exemple : the version 2.5.9 for a "geoPoint" extension, will create a path like : "geoPoint/v2/v2.5/v2.5.9/"
			*/
			var path = "";
			var pathtmp = ""

			var versionArray = ext.version.split(".");												// The version is split by "." to obtain an array of all numeric value.

			for (var i = 0; i < versionArray.length; i++) {											// Foreach value in he array
				pathtmp = (pathtmp == "" ? "v" : pathtmp + ".") + versionArray[i];					// Check if this is the first loop by checking the "pathtmp", 
				path += pathtmp + "/";																//		if true add "v" before the numeric value then add to the global path
			}																						//		else add the pathtmp + "." value to the numeric value then add to the global path.
																									//	Exemple by iteration for the version "2.5.6" :
																									//		1 -> "v2"				(pathtmp = "")
																									//		2 -> "v2/v2.5"			(pathtmp = "v2")
																									//		3 -> "v2/v2.5/v2.5.6"	(pathtmp = "v2.5")
			path = data.name[0] + "/" + path;														// Then append the name of the extension by this path.


			/*
			** Store file
			*/
			_me.FileSystemController.createPath(_me.uploadDir + path); 								// Create path for this extension name and version
			_me.FileSystemController.move(ext.path, _me.uploadDir + path + ext.filename, function() { 	// Move the file from the tmp folder to the new location
				ext.path = _me.uploadDir.split("/var/www/")[1] + path;																	// Change path member of the file class
				_me.FileCollection.add(ext, function () { 											// Add this file in DB
					callback();																		// Call a fuction to close the request. 
				});
			});
		}
	});

	
}

module.exports = fileController;
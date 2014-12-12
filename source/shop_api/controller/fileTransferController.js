var logger = require("../utility/logger.js");
var fsUtils = require("../utility/fsUtils");
require("../config/config.js");

function fileTransferController() {

}

fileTransferController.prototype.upload = function(req, callback) {
	var extensionManager = require("../manager/extensionManager.js");
	var multiparty = require("multiparty");
	var form = new multiparty.Form();
	var me = this;

	form.parse(req, function(err, fields, files) {
		if (err) {
	    	logger.error(err);
	    	callback(err);
		} else {
			if (files["file"].length == 1) {
				var file = files["file"][0];
				me.getPackage(file, function(err, fileInfos) {
					console.log(fileInfos);
					//check name
					me.checkDependencies(fileInfos["dependencies"], function (err) {
						if (err) {
							callback(err)
						} else {
							var pathInfos = me.createPath(fileInfos);
							console.log(pathInfos);
							pathInfos.size = file.size;
							fsUtils.move(file["path"], pathInfos.fullPath, function (err) {
								extensionManager.createNewExtension(fileInfos, pathInfos, function(err) {
									if (err) {
										callback(err);
									} else {
										callback(null);
									}
								});
							})
						}
					});
				});
			} else {
				var err = "Only one file has to be given";
				logger.error(err);
				callback(err);
			}		
		}
	})
}

fileTransferController.prototype.createPath = function(fileInfos) {
	var path = {};
	path.name = fileInfos["name"] +  "-v" + fileInfos["version"] + ".zip";
	path.path = __UploadDir__ + "/" + fileInfos["name"] + "/";
	path.fullPath = path.path + path.name;

	return path;
}

fileTransferController.prototype.getPackage = function (file, callback) {
	var filename = file.originalFilename.split(".zip")[0];
	console.log(filename);
	fsUtils.unzipPackage(file.path, filename, function (err, output) {
		if (err) {
			callback(err, null);
		} else {
			console.log(output);
			var fileInfos = require(output);//USE READ INSTEAD
/*			fsUtils.readFile(output, function(err) {

			})
*/
			fsUtils.removePackage(output, function(err) {
				if (err) {
					callback(err, null);
				} else {
					callback(err, fileInfos)
				}
			})
		}
	})
}

fileTransferController.prototype.checkDependencies = function(dependencies, callback) {
	var extensionManager = require("../manager/extensionManager.js");
	if (dependencies.length > 0) {
		extensionManager.haveTheseByNV(dependencies, function(err, bool, missing) {
			if (err) {
				callback(err);
			} else if (bool == false) {
				var err = "The extension : " + missing.name + " (v : " + missing.version + ") doesn't exist";
				logger.error(err);
				callback(err);
			} else {
				callback(null);
			}				
		});
	} else {
		callback(null);
	}
	
}

module.exports = fileTransferController;
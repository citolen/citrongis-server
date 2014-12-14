var logger = require("../utility/logger.js");
var fsUtils = require("../utility/fsUtils");
require("../config/config.js");

function fileTransferController() {

}

fileTransferController.prototype.upload = function(req, user_id, callback) {
	var extensionManager = require("../manager/extensionManager.js");
	var me = this;

	me.getFileFromRequest(req, callback, function(file) {
		me.getPackage(file, callback, function(fileInfos) {
			me.checkUploadRight(fileInfos, user_id, callback, function() {
				me.checkDependencies(fileInfos["dependencies"], callback, function () {
					me.StoreInFs(fileInfos, file, callback, function (pathInfos) {
						extensionManager.createNewExtension(fileInfos, pathInfos, user_id, function(err) {
							callback(err);
						});
					});	
				});
			});
		});
	});
}

fileTransferController.prototype.checkUploadRight = function(fileInfos, user_id, callbackErr, callback) {
	var extensionManager = require("../manager/extensionManager.js");
	var me = this;

	extensionManager.getOwnerByName(fileInfos.name, function(err, owner) {
		if (err) {
			callbackErr(err);
		} else {
			if (owner == null) {
				callback();
			} else {
				if (owner == user_id) {
					callback();
				} else {
					var err = "You are not permitted to upload an extensions with this name";
					logger.error(err);
					callbackErr(err);
				}
			}
		}
	});
}

fileTransferController.prototype.getFileFromRequest = function(req, callbackErr, callback) {
	var multiparty = require("multiparty");
	var form = new multiparty.Form();
	var me = this;

	form.parse(req, function(err, fields, files) {
		if (err) {
	    	logger.error(err.message);
	    	callbackErr(err.message);
		} else {
			if (files["file"].length == 1) {
				var file = files["file"][0];
				callback(file);
			} else {
				var err = "Only one file has to be given";
				logger.error(err);
				console.log("err2");
				callbackErr(err);
			}
		}
	});
}

fileTransferController.prototype.StoreInFs = function(fileInfos, file, callbackErr, callback) {
	var me = this;
	var pathInfos = me.createPath(fileInfos);
	
	pathInfos.size = file.size;

	fsUtils.move(file["path"], pathInfos.fullPath, function (err) {
		if (err) {
			callbackErr(err);
		} else {
			callback(pathInfos);
		}
	});
}

fileTransferController.prototype.createPath = function(fileInfos) {
	var path = {};
	path.name = fileInfos["name"] +  "-v" + fileInfos["version"] + ".zip";
	path.path = __UploadDir__ + "/" + fileInfos["name"] + "/";
	path.fullPath = path.path + path.name;

	return path;
}

fileTransferController.prototype.getPackage = function (file, callbackErr, callback) {
	var filename = file.originalFilename.split(".zip")[0];
	fsUtils.unzipPackage(file.path, filename, function (err, output) {
		if (err) {
			callbackErr(err);
		} else {
			fsUtils.readFile(output, function(err, data) {
				if (err) {
					callbackErr(err);
				} else {
					try {
						var fileInfos = JSON.parse(data);
					} catch (e) {
						var err = "Wrong package.json format";
						logger.error(err);
						callbackErr(err);
						return;
					}		
					fsUtils.removeFile(output, function(err) {
						if (err) {
							callbackErr(err);
						} else {
							callback(fileInfos)
						}
					})
				}
			});
		}
	})
}

fileTransferController.prototype.checkDependencies = function(dependencies, callbackErr, callback) {
	var extensionManager = require("../manager/extensionManager.js");
	if (dependencies.length > 0) {
		extensionManager.haveTheseByNV(dependencies, function(err, bool, missing) {
			if (err) {
				callbackErr(err);
			} else if (bool == false) {
				var err = "The extension : " + missing.name + " (v : " + missing.version + ") doesn't exist";
				logger.error(err);
				callbackErr(err);
			} else {
				callback();
			}				
		});
	} else {
		callback();
	}
	
}

module.exports = fileTransferController;
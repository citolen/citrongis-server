var logger = require("../utility/logger.js");
var fsUtils = require("../utility/fsUtils");

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
				me.getPackage(file["path"], function(err, fileInfos) {
					//check name
					me.checkDependencies(fileInfos["dependencies"], function (err) {
						if (err) {
							callback(err)
						} else {
							var pathInfos = me.createPath(fileInfos);
							pathInfos.size = file.size;
							fsUtils.move(file["path"], pathInfos.fullPath, function (err) {
								extensionManager.createNewExtension(fileInfos, pathInfos, function(err) {

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

fileTransferController.prototype.getPackage = function (path, callback) {
	fsUtils.unzip(path, function (err, output) {
		var fileInfos = require(output);
		callback(err, fileInfos)
	})
}

fileTransferController.prototype.checkDependencies = function(dependencies, callback) {
	var extensionManager = require("../manager/extensionManager.js");
	extensionManager.haveTheseByNV(dependencies, function(err, bool, missing) {
		if (err) {
			callback(err);
		} else if (bool == false) {
			var err = "The extension : " + missing.name + " (v : " + missing.version + ") doesn't exist";
			logger.error(err);
			callback(err);
		} else {
			console.log("ok : -> " + bool);
			callback(null);
		}				
	});
}

module.exports = fileTransferController;


/*
			fsUtils.unzip(function() {
				fsUtils.read(function() {
					this.validate(function() {
						fsUtils.move(function() {
							manager.store();
						})
					})
				});
			});
			
			*/
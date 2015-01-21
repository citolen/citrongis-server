var logger = require("../utility/logger.js");
var fsUtils = require("../utility/fsUtils");
require("../config/config.js");

function fileTransferController() {

}

fileTransferController.prototype.download = function(data, res, user_id, callback) {
	var me = this;

	me.getFileInfosFromRequest(data, callback, function (name, version) {
		me.IfExtExists(name, version, callback, function(extInfos) {
			var fullPath = extInfos.storeInformations.fileSystem.path + extInfos.storeInformations.file.filename;
			res.download(fullPath, extInfos.storeInformations.file.filename, function (err) {
				if (err) {
					logger.error(err);
				} else {
					logger.success();
				}
			});
		});
	});
}

fileTransferController.prototype.getFileInfosFromRequest = function (data, callbackErr, callback) {
	var me = this;

	if (data && data.name && data.version) {
		callback(data.name, data.version);
	} else {
		var err = "Missing argument, name and version are needed";
		logger.error(err);
		callbackErr(err);
	}
}

fileTransferController.prototype.IfExtExists = function (name, version, callbackErr, callback) {
	var me = this;

	me.IfExtExistsInDB(name, version, callbackErr, function (extInfos) {
		var fullPath = extInfos.storeInformations.fileSystem.path + extInfos.storeInformations.file.filename;
		me.IfExtExistsInFS(fullPath, callbackErr, function () {
			callback(extInfos);
		})
	})
}

fileTransferController.prototype.IfExtExistsInDB = function (name, version, callbackErr, callback) {
	var extensionManager = require("../manager/extensionManager.js");
	var me = this;

	extensionManager.getByNV(name, version, function (err, result) {
		if (err) {
			callbackErr(err);
		} else {
			callback(result);
		}
	})
}

fileTransferController.prototype.IfExtExistsInFS = function (path, callbackErr, callback) {
	var me = this;

	fsUtils.exists(path, function(exits) {
		if (!exits) {
			var err = "can't read file : " + path;
            logger.internalError(err);
            callbackErr(err);
		} else {
			callback();
		}
	})
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

fileTransferController.prototype.getInfos = function(data, callback) {
	var extensionManager = require("../manager/extensionManager.js");
	var me = this;

	if (data && data["name"] && data["version"]) {
		extensionManager.getByNV(data["name"], data["version"], function (err, ext) {
			if (err) {
				callback(err);
			} else {
				if (!data["keys"] || Object.keys(data["keys"]).length == 0) {
    				var result = me.getAllInfos(ext);
    			} else {
    				var result = me.switchDataGET(ext, data["keys"]);
					if (result == null) {
						var err = "Invalid key for account";
						logger.error(err);
						callback(err, null);
						return;
					}
				}
				callback(null, result);
			}
		});
	} else {
		var err = "Missing data (needed : name , version)";
		logger.error(err);
		callback(err, null);
	}
}

fileTransferController.prototype.switchDataGET = function(ext, data) {
    var result= {};
    
    for (var key in data) {
		switch (key) {
		case "informations_name":
		    result[key] = ext.data.informations.name;
		    break;
		case "informations_description":
		    result[key] = ext.data.informations.description;
		    break;
		case "informations_version":
		    result[key] = ext.data.informations.version;
		    break;
		case "informations_creationDate":
		    result[key] = ext.data.informations.date.creationDate;
		    break;
		case "informations_lastUpload":
		    result[key] = ext.data.informations.date.lastUpload;
		    break;
		case "informations_owner":
		    result[key] = ext.data.informations.owner;
		    break;
		case "informations_minClientVersion":
		    result[key] = ext.data.informations.minClientVersion;
		    break;
		case "contact_email":
		    result[key] = ext.data.contact.email;
		    break;
		case "contact_phoneNumber":
		    result[key] = ext.data.contact.phoneNumber;
		    break;
		case "contact_location":
		    result[key] = ext.data.contact.location;
		    break;
		case "dependencies":
		    result[key] = ext.data.dependencies;
		    break;
		case "accessInformation_isPrivate":
		    result[key] = ext.data.accessInformation.isPrivate;
		    break;
		case "accessInformation_allowedGroups":
		    result[key] = ext.data.accessInformation.allowedGroups;
		    break;
		default :
			return null;
		}
    }
    return result;
}

fileTransferController.prototype.getAllInfos = function(ext) {
	var result= {};
   
	result["informations_name"] = ext.data.informations.name;
    result["informations_description"] = ext.data.informations.description;
    result["informations_version"] = ext.data.informations.version;
    result["informations_creationDate"] = ext.data.informations.date.creationDate;
    result["informations_lastUpload"] = ext.data.informations.date.lastUpload;
    result["informations_owner"] = ext.data.informations.owner;
    result["informations_minClientVersion"] = ext.data.informations.minClientVersion;
    result["contact_email"] = ext.data.contact.email;
    result["contact_phoneNumber"] = ext.data.contact.phoneNumber;
    result["contact_location"] = ext.data.contact.location;
    result["dependencies"] = ext.data.dependencies;
    result["accessInformation_isPrivate"] = ext.data.accessInformation.isPrivate;
    result["accessInformation_allowedGroups"] = ext.data.accessInformation.allowedGroups;

    return result;
}

fileTransferController.prototype.getExt = function(data, callback) {
	var extensionManager = require("../manager/extensionManager.js");
	var me = this;

	if(data && data["search"]) {
		if (Object.keys(data["search"]).length > 0) {
			var filters = me.getSearchObject(data["search"]);
			if (filters != null) {
				extensionManager.findAll(filters, function(err, ext_list) {
					if (err) {
						callback(err);
					} else {
						var dataToSend = [];
						for(var index in ext_list) {
							if (!data["keys"] || Object.keys(data["keys"]).length == 0) {
				    			var result = me.getAllInfos(ext_list[index]);
				    		} else {
					    		var result = me.switchDataGET(ext_list[index], data["keys"]);
					    		if (result == null) {
					    			var err = "Invalid key for extension";
									logger.error(err);
									callback(err, null);
								}
							}
							dataToSend.push(result);
						}
						callback(err, dataToSend);
					}
				});
			} else {
				var err = "Invalid key for extension";
				logger.error(err);
				callback(err);
			}
		} else {
			var err = "Missing data (search filters is empty)";
			logger.error(err);
			callback(err);
		}
	} else {
		var err = "Missing data (needed : search)";
		logger.error(err);
		callback(err);
	}
}

fileTransferController.prototype.getSearchObject = function(data) {
	var result= {};
    
    for (var key in data) {
		switch (key) {
		case "informations_name":
		    result["informations.name"] = new RegExp(data[key]);
		    break;
		case "informations_description":
		    result["informations.description"] = new RegExp(data[key]);
		    break;
		case "informations_version":
		    result["informations.version"] = new RegExp(data[key]);
		    break;
		case "informations_creationDate":
		    result["informations.date.creationDate"] = new RegExp(data[key]);
		    break;
		case "informations_lastUpload":
		    result["informations.date.lastUpload"] = new RegExp(data[key]);
		    break;
		case "informations_owner":
		    result["informations.owner"] = new RegExp(data[key]);
		    break; 
		case "informations_minClientVersion":
		    result["informations.minClientVersion"] = new RegExp(data[key]);
		    break; 
		case "contact_email":
		    result["contact.email"] = new RegExp(data[key]);
		    break; 
		case "contact_phoneNumber":
		    result["contact.phoneNumber"] = new RegExp(data[key]);
		    break; 
		case "contact_location":
		    result["contact.location"] = new RegExp(data[key]);
		    break; 
		case "dependencies":
		    result["dependencies"] = new RegExp(data[key]);
		    break; 
		case "accessInformation_isPrivate":
		    result["accessInformation.isPrivate"] = new RegExp(data[key]);
		    break; 
		case "accessInformation_allowedGroups":
		    result["accessInformation.allowedGroups"] = new RegExp(data[key]);
		    break; 
		default :
			return null;
		}
    }
    return result;
}

module.exports = fileTransferController;
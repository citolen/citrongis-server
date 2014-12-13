var logger = require("../utility/logger.js");

function extensionManager() {

}

extensionManager.createNewExtension = function(extInfos, pathInfos, user_id, callback) {
	var time = require('moment');
	var ext = new (require("../model/extension.js"))();

	ext.data.informations.name = extInfos.name;
	//ext.data.informations.description = extInfos.description;
	ext.data.informations.version = extInfos.version;
	//ext.data.informations.date.creationDate = extInfos.creationDate;
	ext.data.informations.date.lastUpload = time().format("YYYYMMDD:HHMMSS");
	ext.data.informations.owner = user_id;
	//ext.data.informations.minClientVersion = extInfos.minClientVersion;
	//ext.data.contact.email = extInfos.contact.email;
	//ext.data.contact.phoneNumber = extInfos.contact.phoneNumber;
	//ext.data.contact.location = extInfos.contact.location;
	ext.data.storeInformations.fileSystem.path = pathInfos.path;
	ext.data.storeInformations.file.filename = pathInfos.name;
	ext.data.storeInformations.file.size = pathInfos.size;
	ext.data.storeInformations.file.type = "ZipFile";

	if (extInfos.dependencies.length > 0) {
		var async = require('async');
		var queue = async.queue(function(data, callback_queue) {
		        extensionManager.getIdByNV(data.name, data.version, function(err, id) {
		        	if (err) {
		        		queue.kill();
		        		callback(err);
		        	} else {
		        		var infos = {
		        			'name' : data.name,
		        			'version' : data.version,
		        			'id' : id
		        		}
		        		ext.data.dependencies.push(infos)
		        		callback_queue();
		        	}
		        });
		}, 1);

	    queue.drain = function() {
	    	ext.save(callback);
	    }

		for (var i = 0; i < extInfos.dependencies.length; i++) {
	    	queue.push(extInfos.dependencies[i])
	    }
	} else {
		ext.save(callback);
	}
}

extensionManager.getIdByNV = function(name, version, callback) {
	var ext = require("../model/extension.js");

	ext.findOne({'informations.name' : name, "informations.version" : version}, function (err, result) {
		if (err) {
			callback(err, null);
		} else {
			if (result.id != null) {
				callback(null, result.id);
			} else {
				var err = "Can't find any extension with this name and version";
				logger.error(err);
				callback(err, null);
			}
		}
	});
}

extensionManager.getOwnerByName = function(name, callback) {
	var ext = require("../model/extension.js");

	ext.findOne({'informations.name' : name}, function (err, result) {
		if (err) {
			callback(err, null);
		} else {
			console.log(result);
			if (result && result.informations.owner != null) {
				callback(null, result.informations.owner);
			} else {
				callback(null, null);
			}
		}
	});
}

extensionManager.haveTheseByNV = function(NamesVersions, callback) {
	var async = require('async');

	var queue = async.queue(function(data, callback_queue) {
        extensionManager.haveThisByNV(data.name, data.version, function(err, exist) {
        	if (err) {
        		queue.kill();
        		callback(err, null);
        	} else if (!exist) {
				queue.kill();				
				callback(err, false, data);
        	} else {
        		callback_queue();
        	}
        });
    }, 1);

    queue.drain = function() {
    	callback(null, true);
    }

    for (var i = 0; i < NamesVersions.length; i++) {
    	queue.push(NamesVersions[i]);
    }
}

extensionManager.haveThisByNV = function(name, version, callback) {
	var ext = require("../model/extension.js");

	ext.have({'informations.name' : name, 'informations.version' : version}, function (err, result) {
		if (err) {
			callback(err, null);
		} else {
			callback(err, result);
		}
	});
}




module.exports = extensionManager;
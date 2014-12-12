var logger = require("../utility/logger.js");

function extensionManager() {

}

extensionManager.createNewExtension = function(extInfos, pathInfos, callback) {
	var time = require('moment');
	var ext = new (require("../model/extension.js"))();

	ext.data.informations.name = extInfos.name;
	ext.data.informations.description = extInfos.description;
	ext.data.informations.version = extInfos.version;
	ext.data.informations.date.creationDate = extInfos.creationDate;
	ext.data.informations.date.lastUpload = time.format("YYYYMMDD:HHMMSS");
	ext.data.informations.owner = null; // TO CHANGE
	ext.data.informations.minClientVersion = extInfos.minClientVersion;
	ext.data.contact.email = extInfos.contact.email;
	ext.data.contact.phoneNumber = extInfos.contact.phoneNumber;
	ext.data.contact.location = extInfos.contact.location;
	ext.data.storeInformations.fileSystem.path = pathInfos.path;
	ext.data.storeInformations.file.filename = pathInfos.name;
	ext.data.storeInformations.file.size = pathInfos.size;
	ext.data.storeInformations.file.type = "ZipFile";

	for (var i = 0; i < extInfos.dependencies.length; i++) {
    	
    }

	ext.save(callback);
}

extensionManager.haveTheseByNV = function(NamesVersions, callback) {
	var async = require('async');

	var queue = async.queue(function(data, callback_queue) {
        extensionManager.haveThisByNV(data.name, data.version, function(err, exist) {
        	if (err) {
        		queue.kill(); //ERROR callback ?
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
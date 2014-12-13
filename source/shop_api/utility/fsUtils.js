var logger = require("../utility/logger.js");
var fs = require("fs");

function fsUtils() {

}

fsUtils.removeFile = function(path, callback) {
    fs.unlink(path, function(err) {
        if (err) {
            logger.internalError(err);
            callback(err);
        } else {
            callback(null);
        }
    });
}

fsUtils.readFile = function(path, callback) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            logger.internalError(err);
            callback(err, null);
        } else {
            callback(null, data);
        }
    });
}

fsUtils.unzipPackage = function(path, name, callback) {
	var unzip = require("unzip");
	
	var output = "/tmp/package-" + name + ".json"; // NEED OTHER NAME

	fs.createReadStream(path)
    	.pipe(unzip.Parse())
    	.on('entry', function (entry) {
        	var fileName = entry.path;
        	var type = entry.type;                                                                                                                                                   
        	var size = entry.size;
        	if (fileName === "package.json") {
        	    entry.pipe(fs.createWriteStream(output));
        	} else {
            	entry.autodrain();
        	}
    	})
    	.on('close', function() {
    		callback(null, output);
    	})
        .on('error', function(err) {
            logger.internalError(err);
            callback(err, output);
        });
}

fsUtils.createPath = function(path, callback) {
    var mkdirp = require('mkdirp');

    mkdirp(path, function(err) {
        if (err) {
            logger.internalError(err);
            callback(err);
        } else {
            callback(err);
        }
    })
}

fsUtils.move = function(origin, target, callback) {
    var path = target.split("/");
    path.splice(path.length - 1, 1);
    path = path.toString().replace(/,/gi, "/");

    fsUtils.createPath(path, function(err) {
        if (err) {
            callback(err);
        } else {
           fs.rename(origin, target, function (err) {
                if (err) {
                    logger.error(err);
                    callback(err);
                } else {
                    callback(null);
                }
            }); 
        }
    });
}

module.exports = fsUtils;
var logger = require("../utility/logger.js");
var fs = require("fs");

function fsUtils() {

}

fsUtils.unzip = function(path, callback) {
	var unzip = require("unzip");
	
	var output = "/tmp/package.json"; // NEED OTHER NAME

	fs.createReadStream(path)
    	.pipe(unzip.Parse())
    	.on('entry', function (entry) {
        	var fileName = entry.path;
        	var type = entry.type; // 'Directory' or 'File'                                                                                                                                                      
        	var size = entry.size;
        	if (fileName === "package.json") {
        	    entry.pipe(fs.createWriteStream(output));
        	} else {
            	entry.autodrain();
        	}
    	})
    	.on('close', function() {
    		callback(null, output);
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
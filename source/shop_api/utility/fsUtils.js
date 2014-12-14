var logger = require("../utility/logger.js");
var fs = require("fs");

function fsUtils() {

}

fsUtils.removeFile = function(path, callback) {
    fs.unlink(path, function(err) {
        if (err) {
            logger.internalError(err.message);
            callback(err.message);
        } else {
            callback(null);
        }
    });
}

fsUtils.exists = function (path, callback) {
    fs.exists(path, function(exists) {
        if (exists) {
           callback(true);
        } else {
           callback(false);
        }
    });
}

fsUtils.readFile = function(path, callback) {
    fsUtils.exists(path, function (fileExists) {
        if (fileExists) {
             fs.readFile(path, 'utf8', function(err, data) {
                if (err) {
                    logger.internalError(err.message);
                    callback(err.message, null);
                } else {
                    callback(null, data);
                }
            });
        } else {
            var err = "can't read file : " + path;
            logger.internalError(err);
            callback(err);
        }
    }) 
   
}

fsUtils.unzipPackage = function(path, name, callback) {
	var unzip = require("unzip");
	
    var folder = "/tmp/tmp2/";
	var output = folder + "package-" + name + ".json";


    var isPackageFound = false;

    fsUtils.createPath(folder, function(err) {
        if (err) {
            callback(err);
        } else {
            fs.createReadStream(path)
                .pipe(unzip.Parse())
                .on('entry', function (entry) {
                    var fileName = entry.path;
                    var type = entry.type;                                                                                                                                                   
                    var size = entry.size;
                    if (fileName === "package.json") {
                        entry.pipe(fs.createWriteStream(output));
                        isPackageFound = true;
                    } else {
                        entry.autodrain();
                    }
                })
                .on('close', function() {
                    if (isPackageFound) {
                        callback(null, output);
                    } else {
                         var err = "Can't find package.json file in this ZipFile";
                        logger.error(err);
                        callback(err, output);
                    }
                })
                .on('error', function(err) {
                    var err = "Invalid or corrupted Zip format (" + err.message + ")";
                    logger.error(err);
                    callback(err, output);
                });
        }
    })
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
                    logger.error(err.message);
                    callback(err.message);
                } else {
                    callback(null);
                }
            }); 
        }
    });
}

module.exports = fsUtils;
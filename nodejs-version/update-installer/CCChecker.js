var fs = require('fs');

var path;

function CCChecker() {
    
}

CCChecker.prototype.init = function(_path) {
    // Local copy of the configuration path
    path = _path;
    
    // Check if the configuration path exist. If not, create it.
    if (!fs.existsSync(path)) {
	fs.openSync(path, "w");
    }
}

CCChecker.prototype.getUIC = function(FConfigArray) {
    var IConfigJson;
    var UIConfigArray = new Array();

    // Get List of already installed configuration file.    
    IConfigJson = this.getIConfig();
  
    if (IConfigJson == null)
	return FConfigArray;
    // Create List of uninstalled configuration file.
    for (var i in FConfigArray) {
	if (!IConfigJson.hasOwnProperty(FConfigArray[i])) {
	    UIConfigArray.push(FConfigArray[i]);
	}    
    }
    return (UIConfigArray);
}

CCChecker.prototype.getIConfig = function() {
    // Get Json representation of installed configuration file
    var data = fs.readFileSync(path);

    if (data.length != 0)
	return JSON.parse(data);
    else
	return null;
}

CCChecker.prototype.addNewConfig = function(file) {
    var IConfig;
    var data;

    data = fs.readFileSync(path);
    if (data.length != 0)
	IConfig = JSON.parse(data);
    else
	IConfig = {};
    IConfig[file] = "";
    fs.writeFileSync(path, JSON.stringify(IConfig));
}



module.exports = CCChecker;
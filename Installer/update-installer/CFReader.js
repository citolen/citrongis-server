var fs = require('fs');

var FileList;
var path;

function CFReader()
{
    

}

CFReader.prototype.init = function(_path) {
    path = _path
    
    FileList = fs.readdirSync(path);
}

CFReader.prototype.getCFList = function() {
    return FileList;
}

module.exports = CFReader;
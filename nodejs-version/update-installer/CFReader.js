var fs = require('fs');

var FileList;


function CFReader()
{
    

}

CFReader.prototype.init = function() {
    var path = "../update-file/";
    
    FileList = fs.readdirSync(path);
}

CFReader.prototype.getCFList = function() {
    return FileList;
}

module.exports = CFReader;
var sh = require('child_process').execFile;
var fs = require('fs');

function CInstaller() {
    
}

CInstaller.prototype.install = function(file) {
    // Run script file
    if (file.split(".")[1] == "sh")
    {
	fs.chmodSync(file, 0755);
	var script = sh(file);
	script.stdout.on('data', function(data) {
	    console.log(data.toString());
	});
	return true;
    } else {
	return false;
    }


    // Can't get return value with the exec-sync module
    // need to upgrade to node-ffi module :
    // ------------------------------------
    // var FFI = require("node-ffi");
    // var libc = new FFI.Library(null, {"system": ["int32", ["string"]]});
    //
    // var run = libc.system;
    // run("file");
}

module.exports = CInstaller;
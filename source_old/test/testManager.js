function testManager(app) {
    this.fs = require('fs');
    
    this.app = app;
    this.testFolderRelativePath = "./test/";
    this.route = "/test";
    this.testModules = [];
    
    this.loadTestDir();
    this.initMainTestRoute();
}

testManager.prototype.loadTestDir = function() {
    var files = this.fs.readdirSync(this.testFolderRelativePath);
    
    for (var id in files)
    	if (this.fs.lstatSync(this.testFolderRelativePath + files[id]).isDirectory())
    	    this.loadTest(this.testFolderRelativePath, files[id]);
    
}

testManager.prototype.loadTest = function(path, dir) {
    var files = this.fs.readdirSync(path + dir);
    
	for (var id in files)
	    if (files[id] == "main.js") {
		var moduleName = files[id].split(".")[0];
		this.testModules.push(new (require("./" + dir + "/" + moduleName))(this.app, this.route));
	    }
}

testManager.prototype.initMainTestRoute = function () {
    _me = this;
    this.app.get(this.route, function (req, res) {
		rows = "";
	for (var id in _me.testModules) {
	    if (_me.testModules[id].status && _me.testModules[id].status == true)
		rows += '<tr><td>' + _me.testModules[id].name + '</td><td>' + _me.testModules[id].description + '</td><td><a href=' + _me.testModules[id].route + '>GO</a></td></tr>'
	    else 
		rows += '<tr><td>' + _me.testModules[id].name + '</td><td>' + _me.testModules[id].description + '</td><td>DEPRECATED</td></tr>'
	}
	res.status(200);
	res.send(
	    '<style media="screen" type="text/css">'+
		'table {border-width:1px; border-style:solid; border-color:black; width:50%; border-collapse:collapse;}'+
		'td {border-width:1px; border-style:solid; border-color:black; width:50%;}'+
		'</style>'+
		'<table>'+
		'<tr>'+
		'<td>Name</td>'+
		'<td>Description</td>'+
		'<td>Action</td>'+
		'</tr>'+
		rows+
		'</table>'
	);
	
	res.end();
    });
}


module.exports = testManager;
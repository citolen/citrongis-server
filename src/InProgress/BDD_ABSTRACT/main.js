//loading config
require('./config.js');


function makeSomeTest(FC) {
	var Extenssion_class = require('./Extenssion.js');
	var Ext = new Extenssion_class();

	Ext.name = "file1";
	Ext.path = "/path/path/path/test.zip";

	FC.add(Ext);
}

function main() {
	var FileCollection_Class = require('./FileCollection');
	var FileCollection = new FileCollection_Class(makeSomeTest);
}


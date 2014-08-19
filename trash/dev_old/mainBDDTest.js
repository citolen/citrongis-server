//loading config
require('./config.js');

main();

function testAdd(FC, next) {
	console.log("--- --- --- TESTADD --- --- ---");
	var Extenssion_class = require('./Extenssion.js');
	var Ext = new Extenssion_class();

	Ext.name = "file1";
	Ext.path = "/path/path/path/test.zip";

	FC.add(Ext, function() { next(); });
}

function testRemove(FC, next) {
	console.log("--- --- --- TESTREMOVE --- --- ---");
	var Extenssion_class = require('./Extenssion.js');
	var Ext = new Extenssion_class();

	Ext.name = "file1";
	Ext.path = "/path/path/path/test.zip";

	FC.remove(Ext, function() { next(); });
}

//Sepcial test to remove the last file after all test
function testRemoveByName(FC, next) {
	console.log("--- --- --- TESTREMOVEBYNAME --- --- ---");
	var Extenssion_class = require('./Extenssion.js');
	var Ext = new Extenssion_class();

	FC.removeByName("file1", function() { next(); });
}

function testUpdate(FC, next) {
	console.log("--- --- --- TESTUPDATE --- --- ---");
	var Extenssion_class = require('./Extenssion.js');


	FC.getByName("file1", function(file) { 

	// Create defult object to test if a non-stored file is given as parameter to this function.
	var Ext = new Extenssion_class();
	if (file.length > 0) {	
		Ext = file[0];
	}
	Ext.path = "This/Path/as/been/updated/successfully";

	FC.update(Ext, function() { next(); });
		next();
	});
}

function testGet(FC, next) {
	console.log("--- --- --- TESTGET --- --- ---");
	var Extenssion_class = require('./Extenssion.js');
	var Ext = new Extenssion_class();

	FC.getByName("file1", function(file) { 
		for (var id in file) {
			file[id].debug();
		}
		next(); 
	});
}

function makeSomeTest(FC) {
	var async = require('async');
	async.series([
		function remove(next) { testRemove(FC, next); },		// Try to remove file 		Attempt : SUCCES -> 0 rows removed
		function add(next) { testAdd(FC, next); },				// Add file to DB			Attempt : SUCCES -> file is added to DB
		function remove(next) { testRemove(FC, next); },		// Delete It				Attempt : SUCCES -> 1 rows removed
		function update(next, file) { testUpdate(FC, next); },		// Update It			Attempt : FAIL -> no file was found with this name / id
		function add(next) { testAdd(FC, next); },				// ADD new file 			Attempt : SUCCES -> file is added to DB	
		function update(next, file) { testUpdate(FC, next); },		// Update It			Attempt : SUCCES -> file is now updated
		function get(next) { testGet(FC, next); },				// Get the file 			Attempt : SUCCES -> file is return form DB and it's the good file
		function remove(next) { testRemoveByName(FC, next); },		// Try to remove file 		Attempt : SUCCES -> 1 rows removed
		]);
}

function main() {
	var FileCollection_Class = require('./FileCollection');
	//var FileCollection = new FileCollection_Class(makeSomeTest);


	var FileCollection = new FileCollection_Class(function (FC) {
		FC.getByName("toto", function(file) {
			for (var id in file) {
				file[id].debug();
			}
		})
	});
}


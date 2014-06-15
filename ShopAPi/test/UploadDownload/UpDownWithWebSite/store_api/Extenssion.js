function Extenssion() {
	/*
	** Extension Infos
	*/
	this.name = null;
	this.comment = null;
	this.version = null;

	/*
	** File Infos
	*/
	this.filename = null;
	this.path = null;

	/*
	** DB Infos
	*/
	this.db_infos = null;
}

Extenssion.prototype.formatToDB = function() {
	var jsonObj = {
		"name" : this.name,
		"comment" : this.comment,
		"version" : this.version,
		"filename" : this.filename,
		"path" : this.path,	
	};
	return jsonObj;
}

Extenssion.prototype.fromRequest = function(file, data) {
	this.name = data.name[0];
	this.comment = data.comment[0];
	this.version = data.version[0];
	this.filename = file['originalFilename'];
	this.path = file['path'];
}

Extenssion.prototype.debug = function() {
	console.log("\tFILE :");
	console.log("\t\tName : " + this.name);
	console.log("\t\tComment : " + this.comment);
	console.log("\t\tVersion : " + this.version);
	console.log("\t\tFilename : " + this.filename);
	console.log("\t\tpath : " + this.path);
	this.db_infos.debug();	
}

Extenssion.prototype.InitFromDB = function (db_obj) {
	this.name = db_obj['name'];
	this.comment = db_obj['comment'];
	this.version = db_obj['version'];
	this.filename =db_obj['filename'];
	this.path = db_obj['path'];
	this.db_infos = db_obj['db_infos'];
}
module.exports = Extenssion;
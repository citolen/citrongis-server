function Extenssion() {
	this.name = null;
	this.path = null;
	this.version = null;
	this.db_infos = null;
}

Extenssion.prototype.formatToDB = function() {
	var jsonObj = {
		"name" : this.name,
		"path" : this.path,
		"version" : this.version
	};
	return jsonObj;
}

Extenssion.prototype.fromRequest = function(file, data) {
	this.name = file['originalFilename'];
	this.path = file['path'];
	this.version = data.version[0];
}

Extenssion.prototype.debug = function() {
	console.log("\tFILE :");
	console.log("\t\tname : " + this.name);
	console.log("\t\tpath : " + this.path);
	console.log("\t\tversion : " + this.version);
	this.db_infos.debug();
	
}

module.exports = Extenssion;
function Extenssion() {
	this.id = null;
	this.name = null;
	this.path = null;
}

Extenssion.prototype.formatToDB = function() {
	var jsonObj = {
		"name" : this.name,
		"path" : this.path
	};
	return jsonObj;
}

Extenssion.prototype.debug = function() {
	console.log("\tFILE :");
	console.log("\t\tid : " + this.id);
	console.log("\t\tname : " + this.name);
	console.log("\t\tpath : " + this.path);
}

module.exports = Extenssion;
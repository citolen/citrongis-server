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
	console.log("FILE :");
	console.log("id : " + this.id);
	console.log("name : " + this.name);
	console.log("path : " + this.path);
}

module.exports = Extenssion;
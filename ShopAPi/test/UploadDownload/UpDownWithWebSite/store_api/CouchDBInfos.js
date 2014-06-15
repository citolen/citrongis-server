function couchDBInfos() {
	this.id = null;
	this.rev = null;
}

couchDBInfos.prototype.getID = function() {
	return {'_id' : this.id};
}

couchDBInfos.prototype.getRev = function() {
	return {'_rev' : this.rev};
}

couchDBInfos.prototype.debug = function() {
	console.log("\t\tdb_infos : ");
	console.log("\t\t\tID : " + this.id);
	console.log("\t\t\tREV : " + this.rev);
}

module.exports = couchDBInfos;
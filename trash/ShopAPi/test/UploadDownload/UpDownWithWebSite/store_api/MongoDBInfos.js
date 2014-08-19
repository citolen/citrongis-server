function MongoDBInfos() {
	this.id	= null;
}

MongoDBInfos.prototype.getID = function() {
	return {'_id' : this.id};
}

MongoDBInfos.prototype.debug = function() {
	console.log("\t\tdb_infos : ");
	console.log("\t\t\tID : " + this.id);
}

module.exports = MongoDBInfos;
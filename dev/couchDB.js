function couchDB() {
	this.couchDriver = require('nano');
	this._db_ = null;
	this.db_colllection_name = null;
	this.db_collection = null;
}

mongoDB.prototype.connect = function(callback){
	var _me = this;
	var url = _me.getDBUrl();

	_me._db_ = _me.couchDriver(url);
	callback(_me);
}

mongoDB.prototype.close = function() {
	//NOT NEEDED IN COUCHDB
}

mongoDB.prototype.create = function(arg, callback) {
	var _me = this;

	_me._db_.insert(arg, "File", function(err, body) {
 		if (err)
           console.log("Can't insert in collection");
        else
            console.log("Insert Success");
        callback();
	});
}

mongoDB.prototype.read = function(arg, callback) {

}

mongoDB.prototype.update = function(selector, arg, callback) {

}


}

mongoDB.prototype.useCollection = function(collection) {
	var _me = this;

	_me._db_.get(collection, function(err, body) {
		if (err) {
			console.log("Database not exist");
			return;
		}
		_me.db_colllection_name = collection;
    	_me.db_collection = _me._db_.use(collection);
	});
}

mongoDB.prototype.getDBUrl = function() {
	return 'http://' + __CouchDatabaseIP__ + ':' + __CouchDatabasePort__;
}


module.exports = couchDB;
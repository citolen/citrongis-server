function DB() {
    this._mongoDriver_ = require('mongodb').MongoClient;
    this._db_ = null;
}

DB.prototype.connect = function() {
    console.log("Try to connect to DB");
    this._mongoDriver_.connect('mongodb://' + __DatabaseIP__ + ':' + __DatabasePort__ + '/' + __DatabaseName__, function(err, db) {
	if (err)
	    console.log("Error Connect : ". err);
	else {
        console.log("Succes Connect");
	    this._db_ = db;
    }
    });
}

DB.prototype.close = function() {
    if (this._db_ != null)
	this._db_.close();
}

DB.prototype.create = function(collection_name, arg) {
    if (!isConnected())
	   return;

    var collection = this._db_.collection(collection_name);
    
    collection.insert(arg, function(err, count) {
	if (err)
	    console.log("Can't insert in collection");
    });
}

DB.prototype.read = function(collection_name, arg) {
    if (!isConnected())
	   return;
}

DB.prototype.update = function(collection_name, arg) {
    if (!isConnected())
	   return;
}

DB.prototype.remove = function(collection_name, arg) {
    if (!isConnected())
	   return;
}

DB.prototype.isConnected = function() {
    if (this._db_ == null) {
	   console.log("Error driver is not connected to database");
	   return false
    }
    return true;
}

module.exports = DB;
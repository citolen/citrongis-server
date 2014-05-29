function DB() {
    this._mongoDriver_ = require('mongodb').MongoClient;
    this._db_ = null;
    this.collection_name = null;
}

DB.prototype.connect = function(callback) {
    var _me = this;
    console.log("Try to connect to DB");
    var url = _me.getDBUrl();
    _me._mongoDriver_.connect(url, function(err, db) {
	if (err) {
	   console.log("Error Connect : ". err);
	   throw err;
    } else {
        console.log("Succes Connect");
	    _me._db_ = db;
        callback(_me);
    }
    });
}

DB.prototype.useCollection = function(collection) {
    this.collection_name = collection;
}

DB.prototype.getDBUrl = function() {
    return 'mongodb://' + __DatabaseIP__ + ':' + __DatabasePort__ + '/' + __DatabaseName__;
}

DB.prototype.close = function() {
    if (this._db_ != null)
	   this._db_.close();
}

DB.prototype.create = function(arg, callback) {
    if (!this.isConnected())
	   return;

    var collection = this._db_.collection(this.collection_name);

    collection.insert(arg, function(err, count) {
       if (err)
           console.log("Can't insert in collection");
        else
            console.log("Number of row added : " + count.length);
        callback();
    });
}

DB.prototype.read = function(arg, callback) {
    if (!this.isConnected())
	   return;

    var collection = this._db_.collection(this.collection_name);

    collection.find(arg).toArray(function(err, docs) {
        if (err)
            console.log("Can't find file");
        else
            console.log("Number of row read : " + docs.length);
        callback(docs);
    })
}

DB.prototype.update = function(selector,arg, callback ) {
    if (!this.isConnected())
	   return;

    var collection = this._db_.collection(this.collection_name);

    collection.update(selector, arg, function(err, result) {
       if (err)
           console.log("Can't update file");
        else
            console.log("Number of row updated : " + result);
        callback();
    });
}

DB.prototype.remove = function(arg, callback) {
    if (!this.isConnected())
	   return;

    var collection = this._db_.collection(this.collection_name);

    collection.remove(arg, function(err, count) {
        if (err)
            console.log("Can't remove file");
        else
            console.log("Number of row removed : " + count);
        callback();
    })
}

DB.prototype.isConnected = function() {
    if (this._db_ == null) {
	   console.log("Error driver is not connected to database");
	   return false
    }
    return true;
}

module.exports = DB;
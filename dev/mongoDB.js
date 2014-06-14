function mongoDB() {
	this._mongoDriver_ = require('mongodb').MongoClient;
    this._mongoDBInfos_ = require('./MongoDBInfos.js');
	this._db_ = null;
	this.collection_name = null;
}

mongoDB.prototype.connect = function(callback){
	var _me = this;
	var url = _me.getDBUrl();

    console.log("Try to connect to DB");

    _me._mongoDriver_.connect(url, function(err, db) {
    	if (err) {
    	   console.log("Error Connect : ". err);
    	   throw err;
        } else {
            console.log("Succes Connect");
    	    _me._db_ = db;
            callback();
        }
    });
}

mongoDB.prototype.close = function() {
  	if (this._db_ != null)
	   this._db_.close();
}

mongoDB.prototype.create = function(arg, callback) {
 	if (!this.isConnected())
	   return;

    var collection = this._db_.collection(this.collection_name); // to optimize

    collection.insert(arg, function(err, count) {
       if (err)
           console.log("Can't insert in collection");
        else
            console.log("Number of row added : " + count.length);
        callback();
    });
}

mongoDB.prototype.read = function(arg, callback) {
	if (!this.isConnected())
	   return;

    var _me = this;

    var collection = this._db_.collection(this.collection_name); // to optimize

    collection.find(arg).toArray(function(err, docs) {
        var result = [];
        if (err)
            console.log("Can't find file");
        else {
            console.log("Number of row read : " + docs.length);
            for (var i = 0; i < docs.length; i++) {
                var json = {};
                for (var key in docs[i])
                {
                    if (key == "_id") {
                        var MongoDBInfos = new _me._mongoDBInfos_();
                        MongoDBInfos.id = docs[i][key];
                        json["db_infos"] = MongoDBInfos;
                    } else
                        json[key] = docs[i][key];
                }
                result.push(json);
            }
        }
        callback(result);
    });
}

mongoDB.prototype.update = function(selector, arg, callback) {
	  if (!this.isConnected())
	   return;

    var collection = this._db_.collection(this.collection_name); // to optimize

    collection.update(selector, arg, function(err, result) {
       if (err)
           console.log("Can't update file");
        else
            console.log("Number of row updated : " + result);
        callback();
    });
}

mongoDB.prototype.remove = function(arg, callback) {
  	if (!this.isConnected())
	   return;

    var collection = this._db_.collection(this.collection_name); // to optimize

    collection.remove(arg, function(err, count) {
        if (err)
            console.log("Can't remove file");
        else
            console.log("Number of row removed : " + count);
        callback();
    })
}

mongoDB.prototype.getDBUrl = function() {
    return 'mongodb://' + __MongoDatabaseIP__ + ':' + __MongoDatabasePort__ + '/' + __MongoDatabaseName__;
}

mongoDB.prototype.useCollection = function(collection, callback) {
    this.collection_name = collection; // to optimize
    callback();
}

mongoDB.prototype.isConnected = function() {
    if (this._db_ == null) {
	   console.log("Error driver is not connected to database");
	   return false
    }
    return true;
}

module.exports = mongoDB;
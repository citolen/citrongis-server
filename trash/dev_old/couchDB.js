function couchDB() {
	this._couchDriver_ = require('cradle');
	this._couchDBInfos_ = require('./CouchDBInfos.js');
	this._db_ = null;
	this.db_collection = null;
	this.db_collection_name = null;
}

couchDB.prototype.connect = function(callback){
	var _me = this;
	_me._db_ = new (_me._couchDriver_.Connection)(__CouchDatabaseIP__, __CouchDatabasePort__);
	callback(_me);
}

couchDB.prototype.close = function() {
	//NOT NEEDED IN COUCHDB
}

couchDB.prototype.create = function(arg, callback) {
	if (!this.isConnected())
	   return;

	var _me = this;

	_me.db_collection.save(arg, function (err, res) {
	    if (err)
           console.log("Can't insert in collection");
        else
            console.log("Insert Success");
        callback();
	 });
}

couchDB.prototype.read = function(arg, key, callback) {
	if (!this.isConnected())
	   return;
	var _me = this;
	var map = _me.getMap(key);


	var values = [];

	for (var key in arg) {
		values.push(arg[key]);
	}

	_me.db_collection.view(map, { key : values}, function (err, docs) {
		var result = [];
		if (err)
			console.log("Can't find file");
		else {
			console.log("Number of row read : " + docs.length);
            for (var i = 0; i < docs.length; i++) {
                var json = {};
                var CouchDBInfos = new _me._couchDBInfos_();
                for (var key in docs[i]["value"])
                {
                    if (key == "_id") {
                        CouchDBInfos.id = docs[i]["value"][key];
                    } else if (key == "_rev") {
                    	CouchDBInfos.rev = docs[i]["value"][key];
                    } else
                        json[key] = docs[i]["value"][key];
                }
                json["db_infos"] = CouchDBInfos;
                result.push(json);
            }
		}
		callback(result);
	});
}

couchDB.prototype.update = function(selector, arg, key, callback) {
	if (!this.isConnected())
	   return;

	var _me = this;
	var map = _me.getMap(key);
}

couchDB.prototype.remove = function(arg, key, callback) {
  	if (!this.isConnected())
	   return;

	var _me = this;
	var map = _me.getMap(key);
}

couchDB.prototype.useCollection = function(collection, callback) {
	var _me = this;

	_me.db_collection_name = collection;
	_me.db_collection = _me._db_.database(collection.toLowerCase());
	_me.db_collection.exists(function (err, exist) {
		if (err) {
			console.log('Error : ', err);
		} else {
			if (exist) {
				console.log('Database used : ' + collection);
			} else {
				console.log('Creating database : ' + collection);
				_me.db_collection.create(function (err, res) {
					if (err)
						console.log(err);
				});
			}
			_me.createView(callback);
			return;
		} 
		callback();
	});
}

couchDB.prototype.isConnected = function() {
    if (this._db_ == null) {
	   console.log("Error driver is not connected to database");
	   return false
    }
    return true;
}

couchDB.prototype.createView = function(callback) {
	var _me = this;

	_me.db_collection.remove('_design/' + _me.db_collection_name, function (err, design) {
		_me.db_collection.save('_design/' + _me.db_collection_name, { 
			views: { 
				byId: { 
					map: 'function (doc) { emit([doc._id], doc) }'	
				},
				byName: {
					map: 'function (doc) { emit([doc.name], doc) }'
				}
			}		
		});
		callback();
	});
}

couchDB.prototype.getMap = function(key, callback) {
	var _me = this;
	switch (key) {
		case 'Id':
			return _me.db_collection_name + "/byId";
		break;
		case 'Name':
			return _me.db_collection_name + "/byName";
		break;
	}
}

module.exports = couchDB;
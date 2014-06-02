function FileCollection(callback) {
	var _me = this;
	_me.DB_class = require('./DB.js');
	_me.DB = new _me.DB_class();

	_me.DB.useCollection(__ExtenssionCollectionName__);
	_me.DB.connect(function(db) {
		_me.DB = db;
		callback(_me);
	});
}

FileCollection.prototype.add = function(file, callback) {
	var _me = this;

 	_me.DB.create(file.formatToDB(), callback);
};

FileCollection.prototype.update = function(file, callback) {
	var _me = this;

	if (file.id != null) {
		_me.DB.update({'_id' : file.id}, { $set : file.formatToDB()}, callback);
	} else {
		console.log("Error : File is not yet in database");
		callback(); 
	}
}

FileCollection.prototype.getByName = function(file_name, callback) {
	var Extenssion_class = require('./Extenssion.js');

	var _me = this;
	var ExtArray = [];
	_me.DB.read({name : file_name}, function(files) {
		for (var idx in files) {
			var Ext = new Extenssion_class();
			_me.FillExtFromDB(Ext, files[idx]);
			ExtArray.push(Ext);
		}
		callback(ExtArray);
	});
};

/*
** NOT TESTED
*/
FileCollection.prototype.getById = function(id, callback) {
	var Extenssion_class = require('./Extenssion.js');

	var _me = this;
	var ExtArray = [];
	_me.DB.read({'_id' : id}, function(files) {
		for (var idx in files) {
			var Ext = new Extenssion_class();
			_me.FillExtFromDB(Ext, files[idx]);
			ExtArray.push(Ext);
		}
		callback(ExtArray);
	});
};

FileCollection.prototype.remove = function(file, callback) {
	var _me = this;

	_me.DB.remove(file.formatToDB(), callback);
};

FileCollection.prototype.removeByName = function(file_name, callback) {
	var _me = this;

	_me.DB.remove({name : file_name}, callback);
};

/*
** NOT TESTED
*/
FileCollection.prototype.removeById = function(id, callback) {
	var _me = this;

	_me.DB.remove({'_id' : id}, callback);
};

/*
** NOT TESTED
*/
FileCollection.prototype.getAll = function(callback) {
	var Extenssion_class = require('./Extenssion.js');

	var _me = this;
	var ExtArray = [];
	_me.DB.read({}, function(files) {
		for (var idx in files) {
			var Ext = new Extenssion_class();
			_me.FillExtFromDB(Ext, files[idx]);
			ExtArray.push(Ext);
		}
		callback(ExtArray);
	});
};

FileCollection.prototype.FillExtFromDB = function(Ext, db_obj) {
	Ext.id = db_obj['_id'];
	Ext.name = db_obj['name'];
	Ext.path = db_obj['path'];
}

module.exports = FileCollection;
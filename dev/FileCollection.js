function FileCollection(callback) {
	var _me = this;
	_me.DB_class = require('./DB.js');
	_me.DB = new _me.DB_class();

	_me.DB.connect(function() {
		_me.DB.useCollection(__ExtenssionCollectionName__, function() {
			callback(_me);
		});
	});
}

FileCollection.prototype.add = function(file, callback) {
	var _me = this;

 	_me.DB.create(file.formatToDB(), callback);
};

FileCollection.prototype.update = function(file, callback) {
	var _me = this;

	if (file.db_infos)
		_me.DB.update(file.db_infos.getID(), { $set : file.formatToDB()}, 'Id', callback);
	else
		console.log("Error : File is not yet in database");
}

FileCollection.prototype.getByName = function(file_name, callback) {
	var Extenssion_class = require('./Extenssion.js');

	var _me = this;
	var ExtArray = [];
	_me.DB.read({name : file_name}, 'Name', function(files) {
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
	_me.DB.read({'_id' : id}, 'Id', function(files) {
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

	_me.DB.remove(file.formatToDB(), 'Id', callback);
};

FileCollection.prototype.removeByName = function(file_name, callback) {
	var _me = this;

	_me.DB.remove({name : file_name}, 'Name', callback);
};

/*
** NOT TESTED
*/
FileCollection.prototype.removeById = function(id, callback) {
	var _me = this;

	_me.DB.remove({'_id' : id}, 'Id', callback);
};

FileCollection.prototype.exist = function(file, callback)
{
	var Extenssion_class = require('./Extenssion.js');

	var _me = this;
	var ExtArray = [];
	_me.DB.read({name : file.name, version : file.version}, 'Name&Version', function(files) {
		for (var idx in files) {
			var Ext = new Extenssion_class();
			_me.FillExtFromDB(Ext, files[idx]);
			ExtArray.push(Ext);
		}
		if (ExtArray.length == 0)
			callback(false);
		else
			callback(true);
	});
}

/*
** NOT TESTED
*/
FileCollection.prototype.getAll = function(callback) {
	var Extenssion_class = require('./Extenssion.js');

	var _me = this;
	var ExtArray = [];
	_me.DB.read({}, null, function(files) {
		for (var idx in files) {
			var Ext = new Extenssion_class();
			_me.FillExtFromDB(Ext, files[idx]);
			ExtArray.push(Ext);
		}
		callback(ExtArray);
	});
};

FileCollection.prototype.FillExtFromDB = function(Ext, db_obj) {
	Ext.db_infos = db_obj['db_infos'];
	Ext.name = db_obj['name'];
	Ext.path = db_obj['path'];
}

module.exports = FileCollection;
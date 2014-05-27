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

FileCollection.prototype.add = function(file) {
	var _me = this;

 	_me.DB.create(file.formatToDB());
};

FileCollection.prototype.update = function(file) {

}

FileCollection.prototype.getByName = function(name) {

};

FileCollection.prototype.getById = function(id) {

};

FileCollection.prototype.remove = function(file) {

};

FileCollection.prototype.removeByName = function(name) {

};

FileCollection.prototype.removeById = function(id) {

};

FileCollection.prototype.getAllFile = function() {

};

module.exports = FileCollection;
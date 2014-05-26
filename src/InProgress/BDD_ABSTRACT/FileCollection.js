var DB_class = require('./DB.js');

function FileCollection() {
	this.collectionName = __ExtenssionCollectionName__;

	//Test connect
	var db = new DB_class();
	db.connect();
}

FileCollection.prototype.add = function(file) {

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
function DB() {
    this.DB = null;

    if (__UseMongoDB__) {
        var mongoDB_Class = require('./mongoDB.js');
        this.DB = new mongoDB_Class();
    } else if (__UseCouchDB__) {
        var couchDB_Class = require('./couchDB.js');  
        this.DB = new couchDB_Class();
    } else {
        console.log("Error : no database are available, check the config file for the database used values");
    }
    this.collection_name = null;
}

DB.prototype.connect = function(callback) {
    if (this.DB != null)
        this.DB.connect(callback); 
}

DB.prototype.useCollection = function(collection) {
    if (this.DB != null)
        this.DB.useCollection(collection);
}

DB.prototype.close = function() {
    if (this.DB != null)
        this.DB.close();  
}

DB.prototype.create = function(arg, callback) {
    if (this.DB != null)
        this.DB.create(arg, callback);  
}

DB.prototype.read = function(arg, callback) {
    if (this.DB != null)
        this.DB.read(arg, callback);
}

DB.prototype.update = function(selector,arg, callback ) {
    if (this.DB != null)
        this.DB.update(selector, arg, callback); 
}

DB.prototype.remove = function(arg, callback) {
    if (this.DB != null)
        this.DB.remove(arg, callback); 
}

module.exports = DB;
require("./config/config.js");

function extensionsManager() {
	this.Extension = require("./model/extension.js");
}

extensionsManager.prototype.add = function(file, callback) {
	if (this.fileIsValide(file)) {
		var ext = this.getModel(file);

		// NEED ERROR HANDLE IF ONE FAIL
		this.store(file, ext);
		this.register(ext, callback);

	} else {
		this.remove(file);
	}
};

extensionsManager.prototype.getModel = function(file) {
	var ext = new this.Extension();

	//sample
	ext.data.informations.name = file["infos"]["name"][0];
	ext.data.informations.version = file["infos"]["version"][0];
	ext.data.storeInformations.fileSystem.path = __UploadDir__ + "/" + ext.data.informations.name + ext.data.informations.version + "/";

	return ext;
}

extensionsManager.prototype.fileIsValide = function(file) {
	// Can Make some check on file here.
	if (file.length > 1)
		return false;
	return true;
};

extensionsManager.prototype.store = function(file, ext, callback) {
	var fsHelper_C = require("./utility/fileSystem/fileSystemController.js");
	var fsHelper = new fsHelper_C();

	fsHelper.createPath(ext.data.storeInformations.fileSystem.path);
	fsHelper.move(file.path, ext.data.storeInformations.fileSystem.path + ext.data.informations.name);
};

//check error
extensionsManager.prototype.register = function(ext, callback) {
	ext.save(function (err) {
		callback();
	});
};

extensionsManager.prototype.remove = function(ext, callback) {
	// TO IMPL
};



module.exports = extensionsManager;
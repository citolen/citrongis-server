function fileTransfer(callback) {
	var fileController_class = require('./fileController.js');

	this.fileController = new fileController_class(callback);
	this.multiparty = require('multiparty');
}

fileTransfer.prototype.upload = function(request) {
	var _me = this;
	var form = new this.multiparty.Form();


    form.parse(request, function(err, fields, file) {
    	if (err) {
    		console.log(err);
    		return;
    	}
    	console.log("fiels :" +  fields.version);
		console.log(file);

    	// READ FORM (TMP)
    	var array;
    	for (var key in file) {
    		arrayFile = file[key];
    		break;
    	}

      	_me.fileController.check(arrayFile, function(isValide) {
      		if (isValide)
      			_me.fileController.store(arrayFile[0], fields);
      		else
      			console.log("File not valide");
      	});
  	});
}

fileTransfer.prototype.download = function() {

}

module.exports = fileTransfer;
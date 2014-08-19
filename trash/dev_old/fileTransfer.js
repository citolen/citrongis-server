function fileTransfer(callback) {
	var fileController_class = require('./fileController.js');
  var FileCollection_Class = require('./FileCollection');
  var _me = this;

	_me.fileController = new fileController_class(function () {
    _me.FileCollection = new FileCollection_Class(callback);
  });
	_me.multiparty = require('multiparty');
}

fileTransfer.prototype.upload = function(request, callback) {
	var _me = this;
	var form = new this.multiparty.Form();

  /*
  ** Parse the form content
  */
  form.parse(request, function(err, fields, file) {
  	if (err) {
   		console.log(err);
   		return;
   	}

  /*
  ** Get one file (the first)
  */
   	var array;
   	for (var key in file) {
   		arrayFile = file[key];
   		break;
   	}

  /*
  ** Check if the file is valide, if it's true, store the file, else print error and return
  */
    _me.fileController.check(arrayFile, function(isValide) {
    	if (isValide) {
     		_me.fileController.store(arrayFile[0], fields, function () {
            callback(true);
          });
     	} else {
     		console.log("File not valide");
          callback(false);
        }
     });
  });
}

fileTransfer.prototype.download = function(req, callback) {
   this.FileCollection.getAll(callback);
}

module.exports = fileTransfer;
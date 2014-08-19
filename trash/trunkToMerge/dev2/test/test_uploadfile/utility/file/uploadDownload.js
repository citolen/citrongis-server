function uploadDownload() {

}

uploadDownload.upload = function(req, callback) {
	var multiparty = require("multiparty");
	var form = new multiparty.Form();
		
	// Parse the form content
  	form.parse(req, function(err, fields, files) {
  		if (err) {
   			console.log(err);
   			return;// to rework
   		}
  			
 		// Get one file (the first)
 		var file
   		for (var key in files) {
   			file = files[key][0];
   			break;
   		}

   		// Sample ? read package JSON ?
   		file["infos"] = fields;
   		
   		callback(file);
 	});
}

module.exports = uploadDownload;
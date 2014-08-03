
function main() {
	var app = require('express')();
	var routeur = new (require("./routeur.js"))(app);
	var testManager = new (require("./test/testManager.js"))(app);

	
	app.listen(8080);
}


main();


// TEST UPLOAD WITH STORE
/*
function main() {
	var express = require('express')();
	var helper = require("./utility/file/uploadDownload.js");
	var extensionManager_C = require("./extensionsManager.js");
	var extensionManager = new extensionManager_C();

	express.post("/upload_file", function(req, res) {
		helper.upload(req, function (file) {
			extensionManager.add(file);
		});
	});

	express.listen(8080);
}
*/

// TEST UPLOAD DOWNLOAD WITHOUT STORE
/*
function main() {
	var express = require('express')();

	var bodyParser = require('body-parser');

	express.use(bodyParser.urlencoded({extended: true}));
	express.use(bodyParser.json());

	express.post("/upload_file", function(req, res) {
		var multiparty = require("multiparty");
		var form = new multiparty.Form();
		
		
 		// Parse the form content
  		form.parse(req, function(err, fields, file) {
  			if (err) {
   				console.log(err);
   				return;
   			}

  			
  			// Get one file (the first)
	  		var array;
	   		for (var key in file) {
	   			arrayFile = file[key];
	   			break;
	   		}


	 	});
    });

   	express.post("/list_file", function(req, res) {
		var Extension = require("./model/extension.js");
		var tutu = new Extension();
		tutu.all(function (objs) {
			console.log(objs);
		});
   	});

	express.listen(8080);
}
*/


// TEST EXPRESS
/*
function main() {
	var express = require('express')();

	var bodyParser = require('body-parser');

	express.use(bodyParser.urlencoded({extended: true}));
	express.use(bodyParser.json())

	express.get("/", function(req, res) {
        console.log("main");
    });

	express.listen(8080);
}
*/


// TEST DB
/*
function main() {
	var Extension = require("./model/extension.js");
	var User = require("./model/user.js");

	var ext = new Extension();

	ext.data.informations.name = "geoMap";
	ext.data.isAvailable = true;
	ext.save();

	var user = new User();
	user.data.userInfo.firstName = "nicolas";

	ext.data.informations.owner = user.data;
}
*/
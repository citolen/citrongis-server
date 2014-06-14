//loading config


require('./config.js');

main();

function main() {
	var express_class = require('express');
	var express = express_class();

	var bodyParser = require('body-parser')
	express.use(bodyParser());
	

	//express.use(bodyParser());
	//express.enable("trust proxy");

	var fileTransfer_class = require('./fileTransfer.js');
	var filetransfer = new fileTransfer_class(function () {
		express.get("/", function(req, res) {
			filetransfer.upload(req);
    	});

   		express.post("/upload_file", function(req, res) {
			filetransfer.upload(req);
    	});
	});

    

	express.listen(8080);
}
/*
function main() {
	var express_class = require('express');
	var express = express_class();

	var bodyParser = require('body-parser')
	express.use(bodyParser());
	
  	express.post("/upload_file", function(req, res) {
   		console.log(req.body);
   	});

	express.listen(8080);
}
*/

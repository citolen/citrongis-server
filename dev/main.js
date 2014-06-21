require('./config.js');

main();

function main() {
	var express_class = require('express');
	var express = express_class();

	var bodyParser = require('body-parser')

	var fileTransfer_class = require('./fileTransfer.js');
	var filetransfer = new fileTransfer_class(function () {
   		express.post("/upload_file", function(req, res) {
   			express.use(bodyParser());
			filetransfer.upload(req, function(result) {
				if (result)
					console.log("Upload success");
				else
					console.log("Upload failed");
				res.end();
			});
    	});

    	express.post("/list_file", function(req, res) {
			filetransfer.download(req, function(result) {
				res.send(result);
				res.end();
			});
    	});


	    express.get("/", function(req, res) {
                console.log("toto");
            });
	});
	express.listen(8080);
}

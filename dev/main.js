//loading config
require('./config.js');

main();

function defineListAll() {
	//REFACTOR TO CLASS
}
	
function defineUpload() {
	//REFACTOR TO CLASS
}


function defineRoutes() {
	defineListAll();
	defineUpload();
}

function main() {
	var express_class = require('express');
	var express = express_class();

	

	//express.use(bodyParser());
	//express.enable("trust proxy");

	defineRoutes();

	express.listen(8080);
}



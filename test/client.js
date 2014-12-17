var request = require('request');
var fs = require('fs');

function download_txt() {

    var download_form = {};
    
    var post_form = {
	url: 'http://localhost:6060/download_txt',
	form: download_form
    };
    
    request.post(post_form, function(err, res, body) {
	var ws = fs.createWriteStream("./output/test_out.txt");
	res.pipe(ws);

	res.on("end", function() {
	    console.log("event end");
	})
	res.on("data", function(chunk) {
	    console.log("event data");
	});
	ws.on('error', function (err) {
	    console.log("err : " + err)
	});
    });
}

function download_zip() {

    var download_form = {};
    
    var post_form = {
	url: 'http://localhost:6060/download_zip',
	form: download_form
    };
    
    request.post(post_form, function(err, res, body) {
	var ws = fs.createWriteStream("./output/test_out.zip");
	res.pipe(ws);

	res.on("end", function() {
	    console.log("event end");
	})
	res.on("data", function(chunk) {
	    console.log("event data");
	});
	ws.on('error', function (err) {
	    console.log("err : " + err)
	});
    });
}


download_txt();
download_zip();
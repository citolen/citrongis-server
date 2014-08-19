var express = require('express');
var bodyParser = require('body-parser');
var multiparty = require('multiparty')

var app = express();
var MongoClient = require('mongodb').MongoClient

app.use(bodyParser());
app.enable("trust proxy");

app.post('/', function(req, res, next){
    console.log("main");
    res.send("TEST");
    res.end();
});

app.post('/list_file', function(req, res, next){
   MongoClient.connect('mongodb://127.0.0.1:27017/eip', function(err, db) {
    if(err) throw err;

    var collection = db.collection('document_info');
    collection.find().toArray(function(err, results) {
    	console.log(results);
    	db.close();
    	res.send(results);
    });
  });
});


app.post('/download_file', function(req, res, next){
    // Return file url
});

app.post('/upload_file', function(req, res){
  var form = new multiparty.Form();

    form.parse(req, function(err, fields, files) {
      console.log(files);
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      //res.end(util.inspect({fields: fields, files: files}));
    });
	//console.log(req.body);
   //res.end();
});


app.post('/', function(req, res, next){
    console.log("main");
    res.send("TEST");
    res.end();
});

/*
MongoClient.connect('mongodb://127.0.0.1:27017/eip', function(err, db) {
    if(err) throw err;

    var collection = db.collection('document_info');
    collection.insert({a:5}, function(err, docs) {

      // Locate all the entries using find
      collection.find().toArray(function(err, results) {
        console.dir(results);
        // Let's close the db
        db.close();
      });
    });
  })
*/
app.listen(8080);

function main() {
	var app = require('express')();
	var routeur = new (require("./routeur.js"))(app);
	
	var bodyParser = require('body-parser');
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());

	var testManager = new (require("./test/testManager.js"))(app);

	/* TEST */
	/*
	var loginManager = new (require('./loginManager.js'))(app); // maybe rename as something service
	var oauthserver = require('oauth2-server');

	

	app.get("/", function (req, res) {
		res.send('<form action="' + "/login" + '" method="post"'+
                '<table>'+
                '<tr>'+
                    '<td><label for="username">Name</label></td>'+
                    '<td><input type="text" id="username" name="username" placeholder="Enter name"></td>'+
                '</tr><tr>'+
                    '<td><label for="password">password</label></td>'+
                    '<td><input type="text" id="password" name="password" placeholder="Enter Password"></td>'+
                '</tr><tr>'+
                    '<td><input type="hidden" id="client_id" placeholder="client_id" name="client_id" value="testclientid"></td>'+
                '</tr><tr>'+
                    '<td><input type="hidden" id="client_secret" placeholder="client_secret" name="client_secret" value="testclientsecret"></td>'+
                '</tr><tr>'+
                    '<td><input type="hidden" id="grant_type" placeholder="grant_type" name="grant_type" value="password"></td>'+
                '</tr>' +
                '</table>'+
                '<button type="submit">Submit</button>'+
            '</form>');
	})

	app.post("/login", function (req, res) {
		var request = require('request');
	    request.post({  
		  url: 'http://' + new Buffer(req.body.client_id + ":" + req.body.client_secret).toString('base64') + '@localhost:8080/oauth/token',
		  form: {
		    grant_type: req.body.grant_type,
		    username: req.body.username,
		    password: req.body.password,
		    client_id: req.body.client_id,
		    client_secret: req.body.client_secret
		  },
		}, function(err, res, body) {
		  var accessToken = JSON.parse(body).access_token;
			  request.get({
		    url: 'http://localhost:8080/secret',
		    headers: { Authorization: 'Bearer ' + accessToken }
		  }, function(err, res, body) {
		    console.log(body);
		   });
		});
	})

	app.post("/subscribe_run", function (req, res) {
		loginManager.subscribe(req.body);
		res.send("ok");
	});

	app.get("/subscribe", function (req, res) {
		res.send('<form action="' + "/subscribe_run" + '" method="post"'+
                '<table>'+
                '<tr>'+
                    '<td><label for="name">Name</label></td>'+
                    '<td><input type="text" id="name" name="name" placeholder="Enter name"></td>'+
                '</tr><tr>'+
                    '<td><label for="password">password</label></td>'+
                    '<td><input type="text" id="password" name="password" placeholder="Enter Password"></td>'+
                '</tr><tr>'+
                    '<td><input type="hidden" id="clientid" placeholder="clientid" name="clientid" value="testclientid"></td>'+
                '</tr><tr>'+
                    '<td><input type="hidden" id="clientsecret" placeholder="clientsecret" name="clientsecret" value="testclientsecret"></td>'+
                '</tr>' +
                '</table>'+
                '<button type="submit">Submit</button>'+
            '</form>'
        );
	})


	app.get("/secret", app.oauth.authorise(), function (req, res) {
		res.send("SECRET PAGE");
	})
*/
	/* END OF TEST */

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
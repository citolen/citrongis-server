var assert = require("../assert.js");
var async = require("async");
var request = require("request");
var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');
require("../config.js");

function subscribe(email_str, password_str, callback) {
    var subscribe_form = {
	email: email_str,
	password: password_str
    };

    var post_form = {
	url: user_api_addr + '/auth/subscribe',
	form: subscribe_form
    };

    request.post(post_form, function (err, res, body) {
	callback(body);
    });
}

function login(username, password, client_id, client_secret, callback) {
    var login_form = {
        email: username,
        password: password,
        client_id: client_id,
        client_secret: client_secret
    };

    var post_form = {
	url: user_api_addr + '/auth/login',
	form: login_form
    };

    request.post(post_form, function (err, res, body) {
	try {	
	    body = JSON.parse(body);
	} catch (e) {}
	callback({ "status" : res.statusCode, "token" : body.access_token});
    });
}

function createTestAccount(mainCallback) {
    async.series([
	function (callback) {
	    subscribe("user1@epitech.eu", "password1", function (value) {
		assert(value, "Ok", true);
		callback(null, "");
	    });
	},
	function (callback) {
	    subscribe("user2@epitech.eu", "password2", function (value) {
		assert(value, "Ok", true);
		callback(null, "");
	    });
	}
    ], function (err, result) {
	mainCallback(null, "");
    });
    
}

function upload(path, token, callback) {
    var post_form = {
	url : shop_api_addr + "/upload",
	headers : { Authorization: 'Bearer ' + token}
    }

    var r = request.post(post_form, function (err, res, body) {
		try {	
	    	body = JSON.parse(body);
		} catch (e) {}
		callback(res.statusCode);
    });
    var form = r.form();
    form.append('file', fs.createReadStream(path));
}

function download(name, version, callback) {
    var download_form = {
        name: name,
        version: version
    };

    var post_form = {
	url: shop_api_addr + '/download',
	form: download_form
    };

    request.post(post_form, function (err, res, body) {
	try {	
	    body = JSON.parse(body);
	} catch (e) {}
	
	// affiche le contenu de la reponse
//	console.log(res);

	/*Technique n1*/
	/*
	** Recupere le buffer contenu dans res.body et ecrit un fichier .zip avec ce contenu 
	** Methode perso (rien ne prouve que cela peut marcher).
	** 
	** -> il faut certainement jouer sur le encoding
	*/
/*
	var fs = require('fs');
	fs.writeFile("/tmp/testdownload.zip", res.body, {'encoding' : 'binary'}, function (err) {
		if (err) {
			console.log(err);
			callback();	
		} else {
			console.log("OK");
			callback();	
		}	
	});
*/

	/*Technique n2*/
	/*
	** Creer un object writeStrem (genre de buffer)
	** Utilise res (qui est un stream) pour ecrire dans le writeStream
	** Methode officiel qui doit marcher , mais fait un zip vide
	*/
/*
	var ws = fs.createWriteStream("/tmp/testdownload.zip");
	res.pipe(ws);

	res.on("end", function() {
	    console.log("event end");
	})
	
	res.on("data", function(chunk) {
	    console.log("event data");
	});

	ws.on('error', function (err) {
	    console.log(err)
	});
*/	
    });   
}

function main() 
{
    var token1;
    var token2;

    async.series([
	createTestAccount,
	function (callback) { //Login user1
	    login("user1@epitech.eu", "password1", "testclientid", "testclientsecret", function(value) {
		    console.log("Login user 1");
			assert(value.status, 200, true);
			token1 = value.token;
			callback(null, "");
	    });
	},
	function (callback) { //Login user2
	    login("user2@epitech.eu", "password2", "testclientid", "testclientsecret", function(value) {
		    console.log("Login user 2");
			assert(value.status, 200, true);
			token2 = value.token;
			callback(null, "");
	    });
	},
	function (callback) { //upload testapli1-v1  with user 1 (good)
	    upload("./shop_api/ressources/testapli1.zip", token1, function(value) {
		console.log("User 1 : Upload testapli1-v1");
		assert(value, 200, true);
		callback(null, "");
	    });
	},
	function (callback) { //download testapli1-v1
	    download("testapli1", "0.0.1", function (value) {

	    })
	}  
    ]);
}

main()

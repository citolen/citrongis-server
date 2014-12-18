var request = require('request');
var fs = require('fs');

function download_txt_get() {

request
  .get('http://localhost:6060/download_txt')
  .on('error', function(err) {
    console.log(err)
  })
  .pipe(fs.createWriteStream('./output/test_out_get.txt'))
}

function download_zip_get() {

request
  .get('http://localhost:6060/download_zip')
  .on('error', function(err) {
    console.log(err)
  })
  .pipe(fs.createWriteStream('./output/test_out_get.zip'))
}


function download_txt_post() {

request
  .post('http://localhost:6060/download_txt')
  .on('error', function(err) {
    console.log(err)
  })
  .pipe(fs.createWriteStream('./output/test_out_post.txt'))
}

function download_zip_post() {

request
  .post('http://localhost:6060/download_zip')
  .on('error', function(err) {
    console.log(err)
  })
  .pipe(fs.createWriteStream('./output/test_out_post.zip'))
}


download_txt_get();
download_zip_get();
download_txt_post();
download_zip_post();

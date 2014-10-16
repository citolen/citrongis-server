function main(app, route) {
    this.name = "UploadFile";
    this.description = "Upload file on server, and give back the file infos";
    this.route = route + "/uploadfile";

    this.app = app;
    this.status = true
    this.initRoute();
}

main.prototype.initRoute = function() {
    var routeUploadfile = this.route +  "/uploadfile";

    this.initFormRoute(routeUploadfile);
    this.initUploadFileRoute(routeUploadfile);
}

main.prototype.initFormRoute = function(routeUploadfile) {
    this.app.get(this.route, function (req, res) {
        res.send('please fill ALL fields error handdlig has not be done for the moment so one fields forgot = crash'+
            '<form action="' + routeUploadfile + '" method="post" enctype="multipart/form-data">'+
                '<table>'+
                '<tr>'+
                    '<td><label for="name">Name</label></td>'+
                    '<td><input type="text" id="name" name="name" placeholder="Enter name"></td>'+
                '</tr><tr>'+
                    '<td><label for="comment">Comment</label></td>'+
                    '<td><input type="text" id="Comment" placeholder="Comment" name="comment"></td>'+
                '</tr><tr>'+
                    '<td><label for="version">version</label></td>'+
                    '<td><input type="text" id="version" placeholder="version" name="version"></td>'+
                '</tr><tr>'+
                    '<td><label for="exampleInputFile">File</label></td>'+
                    '<td><input type="file" id="exampleInputFile" name="my_file"></td>'+
                '</tr>'+
                '</table>'+
                '<button type="submit">Submit</button>'+
            '</form>'
        );
    });
}

main.prototype.initUploadFileRoute = function(routeUploadfile) {
    var fs = require('fs');
    var helper = require("./utility/file/uploadDownload.js");
    var extensionManager_C = require("./extensionsManager.js");
    var extensionManager = new extensionManager_C();

    this.app.post(routeUploadfile, function (req, res) {
        helper.upload(req, function (file) {
            extensionManager.add(file, function () {
                res.send(
                    '<style media="screen" type="text/css">'+
                        'table {border-width:1px; border-style:solid; border-color:black; width:50%; border-collapse:collapse;}'+
                        'td {border-width:1px; border-style:solid; border-color:black; width:50%;}'+
                    '</style>'+
                    'The file has been added on server.('+ "somepath for the moment return not implemented but can see on the uploadir define on test/config.js" +')</br>Here is the file infos'+
                    '<table>'+ 
                        '<tr>'+
                            '<td>FileName (from fields)</td>'+
                            '<td>return not implemented yet</td>'+
                        '</tr><tr>'+
                            '<td>Comment (from fields)</td>'+
                            '<td>return not implemented yet</td>'+
                        '</tr><tr>'+
                            '<td>Version (from fields)</td>'+
                            '<td>return not implemented yet</td>'+
                        '</tr><tr>'+
                            '<td>FileName</td>'+
                            '<td>return not implemented yet</td>'+
                         '</tr><tr>'+
                            '<td>Size</td>'+
                            '<td>return not implemented yet</td>'+
                        '</tr><tr>'+
                            '<td>FileExtension</td>'+
                            '<td>return not implemented yet</td>'+
                        '</tr>'
                    );
            });
        });
    });
}

module.exports = main;


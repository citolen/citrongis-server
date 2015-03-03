express = require 'express'
fs = require 'fs'
multer = require 'multer'
JSZip = require 'jszip'
mkdirp = require 'mkdirp'

Response = require './models/response'
Model_tools = require './models/model_tools'
Upload = require './models/upload'
Extension = require './db_models/extension'

router = express.Router()

moveExtensions = (path, ext, callback) ->
    directory = 'public/extensions/' + ext.name + '/' + ext.version
    mkdirp directory, (err) ->
        throw err if err
        fs.rename path, directory + '/file.zip', (err) ->
            throw err if err
            callback()

router.post '/upload', multer({ dest: "public/extensions" }), Upload.removeWrongFiles('file'), (req, res, next) ->
    return Response.usageErrors "zip file not found", res if not req.files.file?
    fs.readFile req.files.file.path, (err, data) ->
        throw err if err
        zip = new JSZip(data)
        file = zip.file('package.json')
        return Response.usageErrors "Missing package.json", res if not file?
        pack = JSON.parse file.asText()
        error = []
        for item in [ 'name', 'version' ]
            error.push item if not pack[item]?
        return Response.usageErrors "Missing " + error, res if error.length > 0
        pack.owner_id = req.user.id
        pack.size = req.files.file.size
        pack.isAvailable = true
        Extension.all { where: { name: pack.name } }, (err, value) ->
            throw err if err
            if value.length > 0 and value[0].owner_id.toString() != req.user.id.toString()
                fs.unlink req.files.file.path, (err) ->
                return Response.simpleErrors "Upload not allowed", 9, res
            for item in value
                if item.version == pack.version
                    fs.unlink req.files.file.path, (err) ->
                    return Response.simpleErrors "Extensions exist", 8, res
            Extension.create pack, (err, ext) ->
                throw err if err
                moveExtensions req.files.file.path, ext, () ->
                    Response.success "Success", res

router.get '/getInfos/:name/:version', (req, res, next) ->
    Extension.findOne { where: { name: req.params.name, version: req.params.version } }, (err, ext) ->
        throw err if err
        Response.success ext, res

router.post '/get', (req, res, next) ->
    data = {}
    for key in Extension.attributes
        if req.body[key.name]? and key.private is false
            data[key.name] = new RegExp req.body[key.name]
    Extension.all { where: data }, (err, matchs) ->
        throw err if err
        data = []
        for item in matchs
            d = {}
            for attr in Extension.attributes
                d[attr.name] = item[attr.name] if attr.private is false
            data.push d
        Response.success data, res

module.exports = router
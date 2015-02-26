express = require 'express'
crypto = require 'crypto'
fs = require 'fs'

User = require './db_models/user'
Response = require './models/response'
Model_tools = require './models/model_tools'
Avatar_upload = require './models/avatar_upload'

router = express.Router()

router.completMyInformation = (req, res, next) ->
    User.find req.user.id, (err, user) ->
        req.user = user
        next()

router.post '/set', Avatar_upload.image, (req, res) ->
    Model_tools.parseModelForUpdate req.body, User, (values) ->
        if values.password?
            shasum = crypto.createHash 'sha1'
            shasum.update values.password
            values.password = shasum.digest 'hex'
        req.user[key] = val for key, val of values
        fs.unlink 'public/images/' + req.user.picture, (err) ->
        req.user.picture = req.files.picture.name if req.files.picture?
        user = new User req.user
        user.save (err) ->
           throw err if err
           Response.success "Success", res

router.get '/get', (req, res) ->
    Response.success
        email: req.user.email
        username: req.user.username
        firstname: req.user.firstname
        lastname: req.user.lastname
        dateOfBirth: req.user.dateOfBirth
        language: req.user.language
        profileType: req.user.profileType
        phoneNumber: req.user.phoneNumber
        location: req.user.location
        picture: req.user.picture
        job: req.user.job
    , res

module.exports = router
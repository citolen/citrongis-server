crypto = require 'crypto'

Client = require '../db_models/oauth_client'
User = require '../db_models/user'
AuthAccessToken = require '../db_models/oauth_access_token'

module.exports.getClient = (clientId, clientSecret, callback) ->
    Client.findOne {
        client_id: clientId,
        client_secret: clientSecret
    }, callback

module.exports.grantTypeAllowed = (clientId, grantType, callback) ->
    callback false, true

module.exports.getUser = (username, password, callback) ->
    User.findOne where: { $or: [ { username: username }, { email: username } ] }, (err, user) ->
        callback err if err or !user
        shasum = crypto.createHash 'sha1'
        shasum.update password
        d = shasum.digest 'hex'
        if user.password == d then callback err, user else callback err, null

module.exports.saveAccessToken = (accessToken, clientId, expires, user, callback) ->
    AuthAccessToken.create 
        accessToken: accessToken
        clientId: clientId
        userId: user.id
        expires: expires
        ip: process.ip
    , callback

module.exports.getAccessToken = (bearerToken, callback) ->
    AuthAccessToken.findOne {accessToken: bearerToken}, callback

module.exports.detectIP = (req, res, next) ->
    process.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    next()
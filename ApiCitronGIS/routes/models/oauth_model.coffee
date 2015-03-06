crypto = require 'crypto'

Client = require '../db_models/oauth_client'
User = require '../db_models/user'
AuthAccessToken = require '../db_models/oauth_access_token'
AuthRefreshToken = require '../db_models/oauth_refresh_token'

##
#  Grant Password
##
module.exports.getClient = (clientId, clientSecret, callback) ->
    Client.findOne { where: { clientId: clientId, clientSecret: clientSecret } }, callback

module.exports.grantTypeAllowed = (clientId, grantType, callback) ->
    callback false, true

module.exports.getUser = (username, password, callback) ->
    User.findOne where: { $or: [ { username: username }, { email: username } ] }, (err, user) ->
        return callback err if err or !user
        shasum = crypto.createHash 'sha1'
        shasum.update password
        d = shasum.digest 'hex'
        if user.password == d then callback err, user else callback err, null

module.exports.saveAccessToken = (accessToken, clientId, expires, user, callback) ->
    AuthAccessToken.create 
        accessToken: accessToken
        clientId: clientId
        userId: user.id
        ip: process.ip
    , callback

module.exports.getAccessToken = (bearerToken, callback) ->
    AuthAccessToken.findOne { where: {accessToken: bearerToken} }, (err, token) ->
        callback err, token

##
# Get User IP
##
module.exports.detectIP = (req, res, next) ->
    process.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    next()


##
# Grant RefreshTokens
##

module.exports.saveRefreshToken = (refreshToken, clientId, expires, user, callback) ->
    AuthRefreshToken.create
        refreshToken: refreshToken
        clientId: clientId
        expires: expires
        userId: user.id
    , callback

module.exports.getRefreshToken = (refresh_token, callback) ->
    AuthRefreshToken.findOne { where: { refreshToken: refresh_token } }, callback
        
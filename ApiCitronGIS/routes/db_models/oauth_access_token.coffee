Schema = require "./schema"

AuthAccessToken = Schema.define 'authAccessToken',
    accessToken: String
    clientId: String
    clientSecret: String
    userId: String
    expires: Date
    ip: String

module.exports = AuthAccessToken
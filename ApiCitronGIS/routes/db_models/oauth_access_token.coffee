Schema = require "./schema"

expires_func = () ->
    date = new Date()
    date.setHours(date.getHours() + 1)
    return date

AuthAccessToken = Schema.define 'authAccessToken',
    accessToken: String
    clientId: String
    clientSecret: String
    userId: String
    expires: { type: Date, default: () -> return expires_func() }
    ip: String
    creationDate: { type: Date, default: new Date() }

module.exports = AuthAccessToken
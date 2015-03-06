Schema = require "./schema"

RefreshToken = Schema.define 'oauth_refresh_tokens',
    refreshToken: String
    clientId: String
    expires: Date
    userId: String
    creationDate: { type: Date, default: new Date() }

module.exports = RefreshToken
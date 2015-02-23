Schema = require './schema'

authClient = Schema.define 'authClient',
		clientId: String
		clientSecret: String

module.exports = authClient
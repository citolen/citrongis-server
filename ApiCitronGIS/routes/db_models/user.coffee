Schema = require './schema'

User = Schema.define 'User',
        username: { type: String, length: 25 }
        email: { type: String, length: 50 }
        password: { type: String, length: 25 }
        firstname: { type: String, length: 25 }
        lastname: { type: String, length: 25 }
        dateOfBirth: Date
        language: { type: String, length: 25 }
        profileType: String
        phoneNumber: { type: String, length: 15 }
        location: { type: String, length: 25 }
        picture: { type: String, length: 255 }
        job: Object
        creationDate: { type: Date, default: () -> return new Date }

module.exports = User
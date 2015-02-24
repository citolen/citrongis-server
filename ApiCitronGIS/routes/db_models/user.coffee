Schema = require './schema'

User = Schema.define 'User',
        username: { type: String, length: 25, unique: true }
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

User.attributes = [
        { name: 'username', create: false, update: false }
        { name: 'email', create: true, update: false }
        { name: 'password', create: true, update: true }
        { name: 'firstname', create: false, update: true }
        { name: 'lastname', create: false, update: true }
        { name: 'dateOfBirth', create: false, update: true }
        { name: 'language', create: false, update: true }
        { name: 'profileType', create: false, update: true }
        { name: 'phoneNumber', create: false, update: true }
        { name: 'location', create: false, update: true }
        { name: 'picture', create: false, update: true }
        { name: 'job', create: false, update: true }
]

User.validatesUniquenessOf('email', { message: 'Email already used' });
User.validatesLengthOf('password', {min: 8, message: {min: 'Password is too short'}});

User.prototype.testValid = (callback) ->
    that = @
    @.isValid (valid) ->
        if not valid
            console.log that.errors
            [ message, code ] = [null, null]
            if that.errors.email?
                message = that.errors.email
                code = 4
            if that.errors.password?
                message = that.errors.password
                code = 3
            callback false, message, code
        else
            callback true
module.exports = User
Schema = require './schema'

model = Schema.define 'extensions',
        isAvailable: { type: Boolean, default: false }
        name: { type: String, unique: true }
        description: { type: String, default: "Description unkown" }
        version: { type: String, default: "0.0" }
        creationDate: { type: Date, default: () -> return new Date }
        owner_id: String
        minClientVersion: String
        size: Number
        dependencies: [ String ]

model.attributes = [
        { name: 'name',             create: true, update: false, private: false }
        { name: 'description',      create: false, update: true, private: false }
        { name: 'vesion',           create: true, update: false, private: false }
        { name: 'owner_id',         create: true, update: false, private: false }
        { name: 'minClientVersion', create: true, update: true, private: false }
        { name: 'size',             create: true, update: false, private: false }
        { name: 'dependencies',     create: false, update: true, private: false }
        { name: 'creationDate',     create: false, update: false, private: false }
]

module.exports = model
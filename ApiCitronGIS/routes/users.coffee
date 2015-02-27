express = require 'express'

User = require './db_models/user'
response = require './models/response'

router = express.Router()

router.post '/get', (req, res, next) ->
    data = {}
    for key in User.attributes
        if req.body[key.name]? and key.private is false
            data[key.name] = new RegExp req.body[key.name]
    User.all { where: data }, (err, matchs) ->
        throw err if err
        data = []
        for item in matchs
            d = {}
            for attr in User.attributes
                d[attr.name] = item[attr.name] if attr.private is false
            data.push d
        response.success data, res
        
module.exports = router

fs = require 'fs'

rwf = (req, res, next) ->
    for key, value of req.files
        if key != this.filename
            fs.unlink value.path, (err) ->
    next()

module.exports.removeWrongFiles = (filename) -> rwf.bind({ filename: filename})
    
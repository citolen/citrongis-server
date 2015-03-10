
module.exports.success = (data, res) ->
    res.send
        code: 1
        data: data

module.exports.usageErrors = (error, res) ->
    res.status 400
    res.send
        code: 5
        error: error

module.exports.simpleErrors = (error, code, res) ->
    res.status 400    
    res.send
        code: code
        error: error
    

module.exports.parseModelForCreate = (data, model, callback) ->
    values = {}
    errors = []
    model = model.attributes
    for item in model
        if item.create is true
            if data[item.name]?
                values[item.name] = data[item.name]
            else
                errors.push item.name
    errors = if errors.length is 0 then null else errors
    callback values, errors
        
module.exports.parseModelForUpdate = (data, model, callback) ->
    values = {}
    for item in model.attributes
        values[item.name] = data[item.name] if item.update is true and data[item.name]?
    callback values
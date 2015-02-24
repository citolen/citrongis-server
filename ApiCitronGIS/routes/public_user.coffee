express = require 'express'

User = require './db_models/user'
model_tools = require './models/model_tools'
response = require './models/response'

router = express.Router()

router.post '/subscribe', (req, res, next) ->
    data = model_tools.parseModelForCreate req.body, User, (value, err) ->
        return response.usageErrors "Missing #{err}", res if err
        user = new User value
        user.testValid (valid, message, code) ->
            if not valid
                response.simpleErrors message, code, res
            else
                User.create value, (err, val) ->
                    throw err if err
                    response.success "Success", res
        
module.exports = router;
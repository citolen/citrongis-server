express = require 'express'

User = require './db_models/user'
router = express.Router()

router.completMyInformation = (req, res, next) ->
    User.find req.user.id, (err, user) ->
        req.user = user
        next()

router.get '/', (req, res) ->
    console.log req.user
    res.send 'respond with a resource'

module.exports = router;
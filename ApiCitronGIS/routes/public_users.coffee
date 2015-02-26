express = require 'express'
crypto = require 'crypto'
generatePassword = require 'password-generator'
nodemailer = require 'nodemailer'
debug = require('debug')('ApiCitronGIS')

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
                shasum = crypto.createHash 'sha1'
                shasum.update value.password
                value.password = shasum.digest 'hex'
                User.create value, (err, val) ->
                    throw err if err
                    response.success "Success", res
        
router.post '/forgetPassword', (req, res, next) ->
    User.findOne { where: { email: req.body.email } }, (err, user) ->
        throw err if err
        return response.simpleErrors "email not found", 6, res if not user
        password = generatePassword 10, false
        shasum = crypto.createHash 'sha1'
        shasum.update password
        user.password = shasum.digest 'hex'
        console.log process.env.npm_package_config_email_service
        transporter = nodemailer.createTransport {
            service: process.env.npm_package_config_email_service,
            auth: {
                user: process.env.npm_package_config_email_auth_user,
                pass: process.env.npm_package_config_email_auth_pass
            }
        }
        transporter.sendMail {
            from: process.env.npm_package_config_email_auth_user,
            to: user.email,
            subject: 'CitronGIS - Reste password',
            text: 'Your new password is ' + password
            html: '<p>Your new password is ' + password + '</p>'
        }, (err, data) ->
            throw err if err
            user.save (err) ->
                throw err if err
                response.success 'email send', res
        

module.exports = router
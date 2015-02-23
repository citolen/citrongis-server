Schema = require('jugglingdb').Schema
schema = new Schema process.env.npm_package_config_database_type,
    port: process.env.npm_package_config_database_port
    host: process.env.npm_package_config_database_host
    database: process.env.npm_package_config_database_dbname

module.exports = schema
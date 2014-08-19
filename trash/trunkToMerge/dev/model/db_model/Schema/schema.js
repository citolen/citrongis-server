// CODE ONLY FOR MONGODB , HAS TO EVOLVE LATER

require("../../../config/config.js");
var Schema = require("jugglingdb").Schema;
var Schema = new Schema("mongodb", {url : 'mongodb://' + __MongoDatabaseIP__ + ':' + __MongoDatabasePort__ + '/' + __MongoDatabaseName__});


module.exports = Schema;
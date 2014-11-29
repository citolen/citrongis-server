function logger() {
}

logger.error = function(message) {
	var color = require("colors");

	console.log(message.yellow);
}

logger.internalError = function(message) {
	var color = require("colors");

	console.log("---------------------------------------".red);
	console.log("            INTERNAL ERROR             ".red);
	console.log("---------------------------------------".red);
	console.log("Error message :".red);
	console.log(message.red);
	console.log("---------------------------------------".red);
}

module.exports = logger;
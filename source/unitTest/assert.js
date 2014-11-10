var colors = require("colors");
var counter = 0;

function assert(value, attempt, bool) {
    if (((value == attempt) == bool)) 
	console.log(counter + " => " + "Ok".green);
    else
	console.log(counter + " => " + "Ko ( ".red + value.red + " )".red);
    counter++;
}

module.exports = assert;
var colors = require("colors");
var counter = 0;

//test 1

function assert(value, attempt, bool) {
    if (value) {
	if (((value == attempt) == bool)) 
	    console.log(counter + " => " + "Ok".green);
	else
	    console.log(counter + " => " + "Ko ( ".red + value.red + " )".red);
	counter++;
    }
    else
	console.log(counter + " => " + "Ko ( null value )".red);
	
}

module.exports = assert;
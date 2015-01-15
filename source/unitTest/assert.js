var colors = require("colors");
var counter = 0;


function assert(value, attempt, bool) {
    if (value) {
		try {
			var obj = JSON.parse(value);
			var test = JSON.parse(attempt);
		

			if (Object.keys(obj).length == Object.keys(test).length) {
				for (var key in obj) {
					if (!(test.hasOwnProperty(key))) {
					    console.log(counter + " => " + "Ko ( ".red + value.red + " )".red);
				    	return (counter++);
				  	}

			  		if (typeof(test[key]) === "object") {
				  		return (assert(JSON.strngify(obj[key]), JSON.stringify(test[key]), bool));
					}
					else { 
						if (!(test[key] == obj[key])) {
							console.log(counter + " => " + "Ko ( ".red + value.red + " )".red);
				    		return (counter++);
						}
					}
				}
			    console.log(counter + " => " + "Ok".green);
			}
			else 
			    console.log(counter + " => " + "Ko ( ".red + value.red + " )".red);
		}
		catch (e) {
			if (((value == attempt) == bool)) 
			    console.log(counter + " => " + "Ok".green);
			else
			    console.log(counter + " => " + "Ko ( ".red + value.red + " )".red);
		}
		counter++;
    }
    else
		console.log(counter + " => " + "Ko ( null value )".red);
}

module.exports = assert;
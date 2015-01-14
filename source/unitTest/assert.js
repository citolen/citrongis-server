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
					if (!(test[key] == obj[key])) {
						console.log(counter + " => " + "Ko ( ".red + value.red + " )".red);
				    	return (counter++);
					}
				}
			    console.log(counter + " => " + "Ok".green);
			}
			else 
			    console.log(counter + " => " + "Ko ( ".red + value.red + " )".red);
		}
		catch (e) {
			console.log(e);
			if (((value == attempt) == bool)) 
			    console.log(counter + " =>1 " + "Ok".green);
			else
			    console.log(counter + " =>2 " + "Ko ( ".red + value.red + " )".red);
		}
		counter++;
    }
    else
	console.log(counter + " => " + "Ko ( null value )".red);
}

module.exports = assert;

			var s1 = [
				{"userInfo_firstName": "UserName1"},
				{"userInfo_firstName": "UserName2"}
			];

			var s2 = [
				{"userInfo_firstName": "UserName1"},
				{"userInfo_firstName": "UserName2"}
			];


assert(JSON.stringify({'romain': 1, 'toto': 'ok'}),
		JSON.stringify({'toto': 'ok', 'romain': 1}), true)


/*assert(JSON.stringify(s1),
		JSON.stringify(s2), true)*/
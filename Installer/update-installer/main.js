var F_CCChecker	= require("./CCChecker.js");
var F_CFReader = require("./CFReader.js");
var F_CInstaller = require("./CInstaller.js");

var C_checker = new F_CCChecker();
var C_reader = new F_CFReader();
var C_installer = new F_CInstaller();

var GitUpdatePath = "/home/dev/git/citrongis-server/Installer/update-file/";
var ConfigFilePath = "/home/dev/.cconfig/.cconfig"; 

function main() 
{
    var list_CF;
    var list_CTI;

    // Check if the configuration file ("/home/dev/.cconfig") exist. If not, create it.
    C_checker.init(ConfigFilePath); 

    // Read update-file folders and make a list of available patch in git repository.
    C_reader.init(GitUpdatePath);
  
    // Return list of available patch in the git repository.
    list_CF = C_reader.getCFList()

    // Compare installed and uninstalled patch and return a list of uninstalled configuration.
    list_CTI = C_checker.getUIC(list_CF);

    // Loop through the uninstalled patch list.
    for (var index in list_CTI)
    {

	// Launch each file instalation.
	if (C_installer.install(GitUpdatePath+list_CTI[index])) {
	    // Write new line in currentconfig file
	    C_checker.addNewConfig(list_CTI[index]);
	}
	
    }
    
}

main();
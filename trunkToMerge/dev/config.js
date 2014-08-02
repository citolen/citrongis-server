/*
**
** config.js is the main configuration file, all variable like, url, password, account for db are store in this file. 
** Furthermore this file contains some flags like debug level flags.
**
** 		Warning : Any modification will have a big impact on the API behavior.
**
** Before any changes make sure you have made ​​a copy of the original file.
**
*/


/***********************************************************
************************************************************
****													****
****					DATABASE 						****
****													****
************************************************************
***********************************************************/

/*
** Select Database to use.
*/
// NOT IMPLEMENTED YET

/*
** MongoDB
**
** Database information
**
** Change this information to match with the current Database.
*/
__MongoDatabaseName__ = "eip";
__MongoDatabaseIP__ = "127.0.0.1";
__MongoDatabasePort__ = "27017";

/*
** CouchDB
**
** Database information
**
** Change this information to match with the current Database.
*/
// NOT IMPLEMENTED YET






/***********************************************************
************************************************************
****													****
****					FILESYSTEM                      ****
****													****
************************************************************
***********************************************************/

/*
** UploadDir is used to define where all the extension will be stored
**
**		Note : This folder need to be below /var/www/.
**
**		Warning: Changing this value may result in data loss.
**
*/
__UploadDir__ = "/var/www/store_api/UploadDir/";
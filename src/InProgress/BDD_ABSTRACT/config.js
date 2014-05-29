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
__UseMongoDB__ = true;
__UseCouchDB__ = false; // DO NOT TURN TO TRUE FOR THE MOMENT. (couchDB.js is not in the repository yet)

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
__CouchDatabaseName__ = null;
__CouchDatabaseIP__ = null;
__CouchDatabasePort__ = null;


/*
** ExtenssionCollectionName, is the name used by mongodb to store Extenssion's data. 
**
** 		Warning : Changing this value can cause some trouble : if some file are already stored in database and the ExtenssionCollectionName is changed, new file will be stored inside a new collection and the api will not be able to read old files's data
*/
__ExtenssionCollectionName__ = "Extenssion";
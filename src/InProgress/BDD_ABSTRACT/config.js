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


/*
** Database information
**
** Change this information to match with the current Database.
*/
__DatabaseName__ = "eip"
__DatabaseIP__ = '127.0.0.1'
__DatabasePort__ = "27017"

/*
** ExtenssionCollectionName, is the name used by mongodb to store Extenssion's data. 
**
** 		Warning : Changing this value can cause some trouble : if some file are already stored in database and the ExtenssionCollectionName is changed, new file will be stored inside a new collection and the api will not be able to read old files's data
*/
__ExtenssionCollectionName__ = "Extenssion";
#!/bin/bash 

#Note : This Script is used to launch the backup process.
#	Parameters can be given in the command line, or default value will be used.

cmd="";
zip_path=""
input_mongodb="";
input_couchdb="";
input_file="";

if [ $# -ge 1 ]
then
    cmd=$1
    if [ $# -ge 2 ]
    then
	zip_path=`readlink -f $2`;
	if [ $# -ge 3 ]
	then
	    input_mongodb=`readlink -f $3`;
	    if [ $# -ge 4 ]
	    then
		input_couchdb=`readlink -f $4`;
		if [ $# -ge 5 ]
		then
		    input_file=`readlink -f $5`;
		fi
	    fi
	fi
    fi
fi

if [ $cmd == "import" ]
then
    ./backup.sh $cmd $zip_path $input_mongodb $input_couchdb $input_file;
elif [ $cmd == "export" ]
then
    ./backup.sh $cmd $zip_path $input_mongodb $input_couchdb $input_file;
fi
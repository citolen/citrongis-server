#!/bin/bash

# $0 -> script name
# $1 -> cmd
# $2 -> output path
# $3 -> input mongodb
# $4 -> input couchdb
# $5 -> input file

tmp_folder_export="/tmp/backup_tmp/export"
tmp_folder_import="/tmp/backup_tmp/import"
mdp="dev";

if [ $# -lt 5 ]
then
    echo "Usage $0 [import|export] Zip_file Input_mongodb_path Input_couchdb_path Input_extension_path";
    exit 1;
fi

##################################################
##                                              ##
##			IMPORT			##
##						##
##################################################

if [ $1 == "import" ]; then
    echo "Start Import";
    echo -e "\tInput folder : $2";
    echo -e "\tOuput folder : $5";

# Clean backup_tmp folder
    echo $mdp | sudo -S rm -rf $tmp_folder_import;

# Create Import folder
    mkdir -p $tmp_folder_import;

# Unzip archive
    unzip $2 -d $tmp_folder_import;

# Get FolderName
    archive_name=`basename $2`;
    folder_name="${archive_name%.*}";

# MongoDB Import
    for file0 in "$tmp_folder_import/$folder_name/DB/mongodb/*.0"
    do
	echo $mdp | sudo -S cp $file0 $3 -r
    done
    for filens in "$tmp_folder_import/$folder_name/DB/mongodb/*.ns"
    do
	echo $mdp | sudo -S cp $filens $3 -r
    done

# CouchDB Import
    for filecouch in "$tmp_folder_import/$folder_name/DB/couchdb/*.couch"
    do
	echo $mdp | sudo -S cp $filecouch $4 -r;
    done

# Import File
    for dir in "$tmp_folder_import/$folder_name/extensions/*"
    do
	echo $mdp | sudo -S cp $dir $5 -r;
    done
   

##################################################
##                                              ##
##			EXPORT			##
##						##
##################################################
    
elif [ $1 == "export" ]; then
    echo "Start Export";
    echo -e "\tInput folder : $5";
    echo -e "\tOuput folder : $2";

# Get The current Date
    date=`date +"%m-%d-%Y-%T"`;

# Clean backup_tmp folder
    echo $mdp | sudo -S rm -rf $tmp_folder_export;

# Create Export folder
    mkdir -p $tmp_folder_export;

# Backup DB
    echo -e "\t\tExport DB";
    mkdir -p "$tmp_folder_export/backup-$date/DB/mongodb/";
    mkdir -p "$tmp_folder_export/backup-$date/DB/couchdb/";

# MongoDB Export
    for file0 in "$3/*.0"
    do
	echo $mdp | sudo -S cp $file0 "$tmp_folder_export/backup-$date/DB/mongodb/" -r;
    done    
    for filens in "$3/*.ns"
    do
	echo $mdp | sudo -S cp $filens "$tmp_folder_export/backup-$date/DB/mongodb/" -r;
    done

# CouchDB Export
    for filecouch in "$4/*.couch"
    do
	echo $mdp | sudo -S cp $filecouch "$tmp_folder_export/backup-$date/DB/couchdb/" -r
    done

# Backup File
    echo -e "\t\tExport File";
    mkdir -p "$tmp_folder_export/backup-$date/extensions/";
    
    for dir in "$5/*"
    do
	echo $mdp | sudo -S cp $dir "$tmp_folder_export/backup-$date/extensions/" -r;
    done

# Zip the backup file
    cd $tmp_folder_export && zip -r "backup-$date.zip" "backup-$date/";

# Copy file to Output dir
    echo $mdp | sudo -S mv "$tmp_folder_export/backup-$date.zip" $2;
fi


#!/bin/bash

# $0 -> script name
# $1 -> cmd
# $2 -> input file
# $3 -> input mongodb
# $4 -> input couchdb
# $5 -> output path

tmp_folder="/tmp/backup_tmp/"
mdp="dev";

if [ $# -lt 5 ]
then
    echo "Usage $0 [import|export] Input_extension_path Input_mongodb_path Input_couchdb_path Output_path";
    exit 1;
fi

if [ $1 == "import" ]; then
    echo "import";
elif [ $1 == "export" ]; then
    echo "Start Export";
    echo -e "\tInput folder : $2";
    echo -e "\tOuput folder : $3";

# Get The current Date
    date=`date +"%m-%d-%Y-%T"`;

# Clean backup_tmp folder
    rm -rf $tmp_folder;

# Backup DB
    echo -e "\t\tExport DB";
    mkdir -p "$tmp_folder/backup-$date/DB/";
    echo $mdp | sudo -S cp $3 "$tmp_folder/backup-$date/DB/" -r
    echo $mdp | sudo -S cp $4 "$tmp_folder/backup-$date/DB/" -r

# Backup File
    echo -e "\t\tExport File";
    mkdir -p "$tmp_folder/backup-$date/extensions/";
    echo $mdp | sudo -S cp $2 "$tmp_folder/backup-$date/extensions/" -r;
    
# Zip the backup file
    zip -r "$tmp_folder/backup-$date.zip" "$tmp_folder/backup-$date/";

# Copy file to Output dir
    echo $mdp | sudo -S cp "$tmp_folder/backup-$date.zip" $5 -r;
fi


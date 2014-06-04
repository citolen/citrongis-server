echo "dev" | sudo -S apt-get install couchdb -y
echo "dev" | sudo -S touch /etc/couchdb/local.ini
echo "dev" | sudo -S mkdir /etc/couchdb/local.d
echo "dev" | sudo -S mkdir /var/run/couchdb

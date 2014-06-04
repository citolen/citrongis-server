echo "dev" | sudo -S apt-get install couchdb -y
echo "dev" | sudo -S touch /etc/couchdb/local.ini
echo "dev" | sudo -S mkdir /etc/couchdb/local.d
echo "dev" | sudo -S mkdir /var/run/couchdb

cat /etc/couchdb/default.ini | sed -e "s/port \= 5984/port \= 5985/" > tmp.cfg
echo "dev" | sudo -S mv tmp.cfg /etc/couchdb/default.ini
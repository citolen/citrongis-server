echo dev | sudo -S apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo "A";
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
echo "B";
echo dev | sudo -S apt-get update
echo "C";
echo dev | sudo -S apt-get -y install mongodb-org
echo "D";
#Auto run
echo "E";
echo "
#!/bin/bash
echo dev | sudo -S service mongod start
" > mongodbStart
echo "F";
echo dev | sudo -S mv mongodbStart /etc/init.d/mongodbStart
echo "G";
echo dev | sudo -S chmod +x /etc/init.d/mongodbStart
echo "H";
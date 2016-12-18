#!/usr/bin/env bash

# install requirement
sudo apt-get install python3-dev

# install mongo-server for ubuntu 16.04 LTS
# https://docs.mongodb.com/master/tutorial/install-mongodb-on-ubuntu/
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/testing multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
sudo apt-get update

# Install version 3.4
sudo apt-get install -y mongodb-org=3.4 \
                        mongodb-org-server=3.4 \
                        mongodb-org-shell=3.4 \
                        mongodb-org-mongos=3.4 \
                        mongodb-org-tools=3.4

# Install bower and components
sudo apt-get install npm
sudo npm install -g bower
sudo apt-get install nodejs-legacy
cd ..
bower install

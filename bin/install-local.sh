#!/usr/bin/env bash

# install mongo-server
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
sudo apt-get update

# Install version 3.0.6
sudo apt-get install -y mongodb-org=3.0.6 \
                        mongodb-org-server=3.0.6 \
                        mongodb-org-shell=3.0.6 \
                        mongodb-org-mongos=3.0.6 \
                        mongodb-org-tools=3.0.6

# Install bower and components
sudo npm install -g bower
sudo apt-get install nodejs-legacy
cd ..
bower install

# See http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
sudo apt-get update

# Install version 2.6.6
sudo apt-get install -y mongodb-org=2.6.6 mongodb-org-server=2.6.6 mongodb-org-shell=2.6.6 mongodb-org-mongos=2.6.6 mongodb-org-tools=2.6.6

# or install latest version
# sudo apt-get install -y mongodb-org
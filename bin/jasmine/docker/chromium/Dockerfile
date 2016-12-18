FROM ubuntu:16.04

RUN apt-get update
RUN apt-get install -y xvfb
RUN apt-get install -y chromium-browser
RUN apt-get install -y nodejs
RUN apt-get install -y npm
RUN apt-get install kmod

# glib schema
RUN apt-get install -y gsettings-desktop-schemas

# chromium user dir
RUN mkdir chromium-data

# make script `xvfb-chromium` globally avalable
ADD ./bin/jasmine/docker/chromium/xvfb-chromium /usr/bin/xvfb-chromium
RUN chmod u+x /usr/bin/xvfb-chromium

# add node symlink
RUN ln -s /usr/bin/nodejs /usr/bin/node

RUN mkdir -p /sfchat/bin/jasmine
WORKDIR /sfchat/bin/jasmine

FROM node:0.12

# bower
RUN npm install -g bower

# install bower
RUN mkdir -p /sfchat/static/bower_components
WORKDIR /sfchat

ADD ./bower.json /sfchat/bower.json
ADD ./.bowerrc /sfchat/.bowerrc

RUN bower install --allow-root

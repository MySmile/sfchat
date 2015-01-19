#!/usr/bin/env bash
cd ~
wget http://download.redis.io/releases/redis-2.6.16.tar.gz
tar xzf redis-2.6.16.tar.gz
cd redis-2.6.16
make

# Usage locally.
# 1) run redis-server with command $ ~/redis-2.6.16/src/redis-server
# 2) Run local django-server with $ make
# 3) Running workers in another terminal $ python manage.py rqworker default

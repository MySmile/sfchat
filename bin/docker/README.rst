Docker
======

Docker composer has several containers:

#. sfchat-web   - official `Python 3.5 Docker <https://hub.docker.com/_/python/>`_, ssh server, application requirements
#. sfchat-nginx - official `Nginx 1.11.5 Docker <https://hub.docker.com/_/nginx/>`_, stunnel
#. sfchat-node  - official `Node 0.12 Docker <https://hub.docker.com/_/node/>`_, Bower
#. sfchat-mongo - official `MongoDB 3.4 Docker <https://hub.docker.com/_/mongo/>`_

Pre installation
----------------
Required pre-installed applications:

#. `Docker <https://docs.docker.com/engine/installation/>`_
#. `Compose <https://docs.docker.com/compose/install/>`_

Installation
------------
#. Run in application root ``sudo docker-compose -f bin/docker/docker-compose.yml up``
#. Check containers ``sudo docker-compose ps``
#. Update your ``hosts`` with ``sfchat.dev 0.0.0.0``
#. Check how it's working ``https://sfchat.dev:8443``
#. Accept self signed certificate

Containers
----------

sfchat-web
``````````
Web container has exposed those ports:

- 2227 - `OpenSSH <https://www.openssh.com/>`_
- 8001 - `stunnel <https://www.stunnel.org>`_

SSH
''''
SSH service runs by `supervisord <http://supervisord.org/>`_ and starts automatically with web container.
The main reason to have ssh inside container is to have ability get ``remote interpreter`` for IDE.

Here is a credentials:

#. user: root
#. password: screencast
#. ip: 0.0.0.0
#. port: 2227

To make connection by console simple run ``ssh root@0.0.0.0 -p 2227``.

*Note*: if connection was refused just checkout inside container how it is ``service ssh status``.
In case it's not running execute ``service ssh start``.

Generate admin panel
````````````````````
To generate admin panel please:

#. execute ``sudo docker-compose -f ./bin/docker/docker-compose.yml exec sfchat-web bash`` from project root
#. run ``make admin-docker``
#. open in browser ``https://sfchat.dev:8443/admin``

HTTPS
'''''
Application runs on ``runserver`` with ``stunnel``.

sfchat-nginx
````````````
Nginx is configured to catch all statics:

- port 8443: non-built static
- port 8444: built static

Nginx works as a proxy by passing non-static to ``sfchat-web`` container.

sfchat-node
```````````
Node is an container fo Bower and built JScript. During ``compose up`` it installs all Bower dependencies and built js.

If during developing it's need to re-build js please run:

- ``sudo docker-compose -f ./bin/docker/docker-compose.yml stop sfchat-node``
- ``sudo docker-compose -f ./bin/docker/docker-compose.yml up sfchat-node``

sfchat-mongo
````````````
For configuration MongoDB connection inside linked container e.g. ``sfchat-web`` use:

- host: sfchat-mongo
- port: 27017
- username: ''
- password: ''

To get access from hosted machine please use:

- ip: 0.0.0.0
- port: 27017
- username: ''
- password: ''

Usefull commands
----------------

- go to shell inside container ``sudo docker-compose -f ./bin/docker/docker-compose.yml exec {{container-name}} bash``
- build container ``sudo docker-compose -f ./bin/docker/docker-compose.yml build {{container-name}}``
- build container without caching ``sudo docker-compose -f ./bin/docker/docker-compose.yml build --no-cache {{container-name}}``

*Note*: please substitute all ``{{container-name}}`` by ``sfchat-web``, ``sfchat-nginx``, ``sfchat-node`` or ``fchat-mongo``

For more information please visit `Docker Compose Command-line Reference <https://docs.docker.com/compose/reference/>`_.

Developing workflow
--------------------
If new requirements appears that something should be add to container:

#. find the official container
#. add them to compose
#. run it

The example is an ``sfchat-mongo``.

What if a new module related to existing one then:

#. modify related Dockerfile
#. stop container
#. run build
#. run container or up whole compose in case dependency

The main point here it's not need to rebuild all container or even invalidate cache (for some case it's vital) it's just ``modify-stop-build-run``
chain.

Configuration IDE (PyCharm)
---------------------------
All instructions for configuration based on documentation `Pycharm <https://www.jetbrains.com/pycharm/>`_.

Remote interpreter
``````````````````
To let Pycharm know where locate the python interpreter it's need to configure it.
The way how to do it might vary from version to version but one things stay still is a get interpreter via ssh.

Here is an `official instruction <https://www.jetbrains.com/help/pycharm/2016.1/configuring-remote-interpreters-via-ssh.html>`_ how to configure remote interpreter.
Please fill fields as bellow:

- Use ssh credentials from ``sfchat-web``
- Python interpreter path: ``/usr/local/bin/python3.5``
- PyCharm helps path: ``/opt/.pycharm_helpers``

*Note*: it's possible to see an error message that ``.pycharm_helpers`` is not exist on a server.
In this case error can be ignored because PyCharm will create directory and copy helpers.

Django support
``````````````
#. Open setting and type Django in search box
#. Choose project
#. "Enable Django Support": set checked
#. "Django project root": path to sfchat root
#. "Settings: ``sfchat/settings/docker.py``
#. "Manage script": will set automatically to ``manage.py``
#. "Environment variables": ``DJANGO_SETTINGS_MODULE=sfchat.settings.docker``

More information in `official documentation <https://www.jetbrains.com/help/pycharm/2016.1/django-2.html>`_.

UnitTesting
````````````
Firstly it's need to be sure that `Remote Interpreter <#remote-interpreter>`_ and `Django support <#django-support>`_ for configured.

That's all, just push "Ctrl + Shift + F10" on project root ang choose ``dj`` as a runner to execute all unit tests.

More information in `official documentation <https://www.jetbrains.com/help/pycharm/2016.1/run-debug-configuration-django-test.html#d473601e145>`_

Debugger
````````
It's used `PyDev.Debugger <https://pypi.python.org/pypi/pydevd>`_ to trace python code.

#. Configure `Remote Interpreter <#remote-interpreter>`_
#. Open "Run->Edit configuration"
#. In "Python Remote Debug" click green "+"
#. "Name": ``SFChat debugger``
#. "Local host name": ``127.0.0.10``
#. "Port": ``21000``

More information in `official documentation <https://www.jetbrains.com/help/pycharm/2016.1/remote-debugging.html>`_

UnitTest debugging
''''''''''''''''''
#. Start debug serve by clicking on a green bug or "Run->Debug..."
#. Put breakpoint e.g. in ``/apps/api/middlewares.py``
#. Run all tests to see how execution stop for debugging

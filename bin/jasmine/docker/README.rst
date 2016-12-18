======
Docker
======

Docker composer has one container:

#. sfchat-chromium - official `Ubuntu 16.04 Docker <https://hub.docker.com/_/ubuntu/>`_ with Xvfb, Chromium, and Nodejs

Pre installation
================
Required pre-installed applications:

#. `Docker <https://docs.docker.com/engine/installation/>`_
#. `Compose <https://docs.docker.com/compose/install/>`_

Installation
============
#. Run ``sudo docker-compose -f bin/jasmine/docker/docker-compose.yml up`` or ``sudo make docker-test-up``
#. Check containers ``sudo docker-compose -f bin/jasmine/docker/docker-compose.yml ps``

Containers
==========

sfchat-chromium
---------------

Container is optimized to run `Jasmine <https://jasmine.github.io/>`_ tests by `Karma <https://karma-runner.github.io>`_ inside `Docker <https://www.docker.com/>`_ container
using `Chromium <https://www.chromium.org/>`_ with `Xvfb <https://en.wikipedia.org/wiki/Xvfb>`_.

In nutshell each technology are using for specific purpose:

#. `Jasmine <https://jasmine.github.io/>`_ - unit test framework
#. `Karma <https://karma-runner.github.io>`_ - test runner
#. `Docker <https://www.docker.com/>`_  - virtual environment to keep everything together
#. `Chromium <https://www.chromium.org/>`_ - browser as a context where JavaScript runs
#. `Xvfb <https://en.wikipedia.org/wiki/Xvfb>`_ -  display server for running Chromium

Run tests
==========
#. Open container ``sudo docker-compose -f bin/jasmine/docker/docker-compose.yml exec sfchat-chromium bash`` or ``sudo make docker-test-ssh``
#. Run tests ``npm test``

References
==========
#. `Running a GUI application in a Docker container <https://linuxmeerkat.wordpress.com/2014/10/17/running-a-gui-application-in-a-docker-container/>`_
#. `Bash Special Parameters <http://www.gnu.org/software/bash/manual/bashref.html#Special-Parameters>`_
#. `SIGTERM <https://en.wikipedia.org/wiki/Unix_signal#SIGTERM>`_
#. `Shell Command trap <http://www.gnu.org/software/bash/manual/bashref.html#index-trap>`_

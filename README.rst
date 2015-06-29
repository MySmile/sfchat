******
SFChat
******
Master:
  .. image:: https://travis-ci.org/MySmile/sfchat.svg?branch=master
    :target: https://travis-ci.org/MySmile/sfchat?branch=master

  .. image:: https://coveralls.io/repos/MySmile/sfchat/badge.svg?branch=master
    :target: https://coveralls.io/r/MySmile/sfchat?branch=master
    :align: left
Dev:
  .. image:: https://travis-ci.org/MySmile/sfchat.svg?branch=dev
    :target: https://travis-ci.org/MySmile/sfchat?branch=dev
  .. image:: https://coveralls.io/repos/MySmile/sfchat/badge.svg?branch=dev
    :target: https://coveralls.io/r/MySmile/sfchat?branch=dev


`Secure Free Chat (SFChat) <https://sfchat.mysmile.com.ua/>`_ - is Django and Mongodb based RESTfull chat.

Secure:
  #. Chat history are not saved on server
  #. Content-Security-Policy with https only

Free:
  #. Open Source
  #. BSD 3-Clause license

Installation
============
  #. Install required dependency: ``make install-local`` or ``make install-prod``
  #. Generate database for admin panel: ``make admin``
  #. Build and optimize js from source: ``make build-js``

Requirements
============
  - Python 3
  - Django 1.8
  - Django Rest Api Framework
  - MongoDB
  - JQuery
  - Requirejs

For more information please look into ``./config/requirements/production.txt`` and ``./bower.json``.

Screenshots
===========
.. figure:: https://raw.github.com/MySmile/sfchat/dev/docs/screenshots/main_and_chat_pages.png
   :alt: Main and chat pages

Documentation
=============
Technical documentation can be found in ``/docs`` folder.

Tests
=====

Unit
----
Python unit test can be found in ``tests`` folder inside each applications.

Test running:
  - all tests please run ``make test``.
  - specific test it's necessary set full path to test class for instance: ``python3 manage.py test apps.chat.tests.test_views``.

Functional
----------
Selenium IDE is used for functional testing.
Selenium Test Cases and Test Suites can be found in ``/bin/Selenium``.

Test running:
  - Install `Selenium IDE plugin <http://www.seleniumhq.org/download/>`_ for Firefox browser
  - Follow `Selenium IDE instruction <http://www.seleniumhq.org/docs/02_selenium_ide.jsp#opening-the-ide>`_ to open and run test

License
=======
BSD 3-Clause

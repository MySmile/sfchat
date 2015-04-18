******
SFChat
******
.. image:: https://travis-ci.org/MySmile/sfchat.svg?branch=dev
    :target: https://travis-ci.org/MySmile/sfchat
.. image:: https://coveralls.io/repos/MySmile/sfchat/badge.png?branch=dev
  :target: https://coveralls.io/r/MySmile/sfchat?branch=dev


Secure Free Chat (SFChat) - is Django and Mongodb based RESTfull chat.

Secure:
  #. Chat history are not saved on server
  #. Content-Security-Policy with https only

Free:
  #. Open Source
  #. BSD-3-Clause license

Installation
============
  #. Run in terminal ``$ make install``

Requirements
============
  - Python 3.4
  - Django 1.7
  - Django Rest Api Framework
  - Mongodb
  - JQuery

For more information please look into ``/config/requirements/production.txt`` and ``/bin/bower/bower.json``.

Screenshots
===========
.. figure:: https://raw.github.com/MySmile/sfchat/dev/docs/screenshots/main_and_chat_pages.png
   :alt: Main and chat pages

Documentation
=============
Technical documentation can be found in ``/docs`` folder.

License
=======
BSD-3-Clause

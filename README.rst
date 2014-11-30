******
SFChat
******
Secure Free Chat (SFChat) - is Django and Mongodb based RESTfull chat.

Secure:
  #. Chat history are not saved on server
  #. Content-Security-Policy with https only

Free:
  #. Open Source
  #. BSD-3-Clause license

Installation
============
  #. Dependences: ``$ sudo pip3 install -r config/requirements.pip``
  #. FrontEnd components: ``sudo bower install``

Requirements
============
  - Python 3.4
  - Django 1.7
  - Django Rest Api Framework
  - Celery
  - Mongodb
  - JQuery

For more information please look into ``/config/requirements/production.txt`` and ``/bin/bower/bower.json``.

Screenshots
===========
.. figure:: https://raw.github.com/MySmile/sfchat/dev/docs/screenshots/main_and_chat_pages.png
   :alt: Main and chat pages

License
=======
BSD-3-Clause

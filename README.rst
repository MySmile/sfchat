******
SFChat
******

+------------+----------------+------------------------+------------------------+
| Branch     | General        | Back-end               | Front-end              |
+============+================+========================+========================+
| master     | |master_build| | |master_back_end_cov|  | |master_front_end_cov| |
+------------+----------------+------------------------+------------------------+

Master
  .. |master_build| image:: https://travis-ci.org/MySmile/sfchat.svg?branch=master
    :target: https://travis-ci.org/MySmile/sfchat?branch=master
  .. |master_back_end_cov| image:: https://coveralls.io/repos/MySmile/sfchat/badge.svg?branch=master
    :target: https://coveralls.io/r/MySmile/sfchat?branch=master
  .. |master_front_end_cov| image:: https://codecov.io/gh/MySmile/sfchat/branch/master/graph/badge.svg
    :target: https://codecov.io/gh/MySmile/sfchat
  .. image:: https://readthedocs.org/projects/sfchat/badge/?version=stable
    :target: https://readthedocs.org/projects/sfchat/?badge=stable
    :alt: Documentation Status
  .. image:: https://badge.fury.io/py/sfchat.svg
    :target: http://badge.fury.io/py/sfchat

Dev
  .. image:: https://travis-ci.org/MySmile/sfchat.svg?branch=dev
    :target: https://travis-ci.org/MySmile/sfchat?branch=dev
  .. image:: https://coveralls.io/repos/MySmile/sfchat/badge.svg?branch=dev
    :target: https://coveralls.io/r/MySmile/sfchat?branch=dev
  .. image:: https://codecov.io/gh/MySmile/sfchat/branch/dev/graph/badge.svg
    :target: https://codecov.io/gh/MySmile/sfchat
  .. image:: https://readthedocs.org/projects/sfchat/badge/?version=dev
    :target: https://readthedocs.org/projects/sfchat/?badge=dev
    :alt: Documentation Status
    :align: left

`Secure Free Chat (SFChat) <https://sfchat.mysmile.com.ua/>`_ - is Django and Mongodb based RESTfull chat.

Secure:

#. Chat history are not saved on server
#. Content-Security-Policy with https only

Free:

#. Open Source
#. BSD 3-Clause license

Installation
============
#. Install required dependency: ``make install-prod``
#. Generate database for admin panel: ``make admin``
#. Build and optimize js from source: ``make build-js``

Requirements
============
- `Python 3.5 <https://www.python.org/downloads/release/python-350/>`_
- `Django 1.8 <https://docs.djangoproject.com/en/1.10/releases/1.8/>`_
- `Django Rest Api Framework <http://www.django-rest-framework.org/>`_
- `MongoDB 3.4 <https://docs.mongodb.com/v3.4/release-notes/3.4/>`_
- `jQuery 2.2 <https://blog.jquery.com/2016/01/08/jquery-2-2-and-1-12-released/>`_
- `Requirejs 2.3 <http://requirejs.org/>`_

Screenshots
===========
.. figure:: https://raw.github.com/MySmile/sfchat/dev/docs/screenshots/main_and_chat_pages.png
   :alt: Main and chat pages

Documentation
=============
Technical documentation is available in `html <http://sfchat.readthedocs.org/en/latest/>`_, pdf, and epub formats.

Docker
======
For development process it's prepared Docker. More instruction can be found in `Docker Readme </bin/docker/README.rst>`_.

Tests
=====

Back-end unit
-------------
Python unit test can be found in ``tests`` folder inside each applications.

Running
```````
Manually:

- to run all tests execute ``make test``.
- to run specific test it's necessary set full path to test class. For instance: ``python3 manage.py test apps.chat.tests.test_views``.

With IDE:

All information to configure your IDE with Docker is in `Docker Readme </bin/docker/README.rst>`_ using `PyCharm <https://www.jetbrains.com/pycharm/>`_ as an example.

Functional
----------
All information about functional testing is in `Selenium Readme </bin/selenium/README.rst>`_.

Front-end unit
--------------
Everything related to front-end unit tests is inside `Jasmine Readme </bin/jasmine/README.rst>`_.

Contribution
============
If you find this project worth to use please add a star. Follow changes to see all activities.
And if you see room for improvement, proposals please feel free to create an issue or send pull request.
Here is a great `Guide to Start Contributing <https://guides.github.com/activities/contributing-to-open-source/>`_.

Please note that this project is released with a `Contributor Code of Conduct <http://contributor-covenant.org/version/1/4/>`_.
By participating in this project and its community you agree to abide by those terms.

License
=======
SFChat is licensed under the BSD 3-Clause License. Please see the `LICENSE <LICENSE.txt>`_ file for details.

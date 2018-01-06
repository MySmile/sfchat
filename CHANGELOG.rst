2017-xx-xx v1.0.0
=================
* Added: advertisement module

2017-xx-xx v0.14.0
==================
* Added: load tests
* Added: run Selenium tests on TravisCI
* Modified: Long Pulling to support Tornado
* Increased: unit tests coverage

2017-xx-xx v0.13.1
==================
* Fixed: nginx docker configuration for csp

2016-12-18 v0.13.0
==================
* Added: Docker for development environment
* Added: font-end unit tests (Karma + Jasmine)
* Added: Docker for front-end tests
* Upgraded: front-end dependencies: jQuery 2.2, Requirejs 2.3, Rjs 2.3
* Upgraded: back-end dependencies: Django 1.10.4, Pymongo 3.4.0, DjangoRestFramework 3.5.3, Pytz 2016.10
* Modified: way to start requirejs modules
* Modified: documentation
* Removed: sending javaScript's errors to Google Analytics
* Fixed: csp report header validation

2015-06-29 v0.12.0
==================
* Added: message notifier on the page title
* Added: admin panel with chat list table, action to clear chats manually
* Added: requirejs
* Added: normalize.css
* Added: Selenium IDE test cases
* Added: technical documentation in RST-format
* Fixed: clearing closed chats

2015-03-01 v0.11.0
==================
* Added: unitTests for views
* Added: technical documentation to repository
* Removed: created date from GET:messages response
* Modified: design of chat page such as padding, line-height etc.
* Fixed: 404 and 500 error for API
* Fixed: refresh chat page on Firefox shows JS error message

2014-12-27 v0.10.0
==================
* Modified: moved chat token from parameter to header for API authorization
* Modified: Content Security Policy is turned off for API
* Added: connecting TravisCI with Coveralls
* Added: unitTests for views
* Fixed: CSRF token verification
* Fixed: message date issue in Safari browser
* Fixed: chat was not working in Opera browser
* Fixed: message date is show local time now

2014-12-07 v0.9.0
=================
* Released: working prototype

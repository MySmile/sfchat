SFChat
======

SFChat is acronym for Secure Free Chat under GNU license. 

L10N
====

::
  * Add new language to LANGUAGES in *sfchat/settings.py*. For example, `('pl', 'Polska')`
  * Run command `$ django-admin makemessages -l pl -a` from project directory
  * Edit file *locale/pl/LC_MESSAGES/django.po* for translate 
  * Run command `$ django-admin.py compilemessages` to compile new translate file


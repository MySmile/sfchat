# -*- coding: utf-8 -*-
# secret settings
from mongoengine import connect

DEBUG = True
TEMPLATE_DEBUG = DEBUG

connect('sfchat', host='localhost', port=27017, username='', password='')

SECRET_KEY = '&ku!ebrl5h61ztet=c&ydh+sc9tkq=b70^xbx461)l1pp!lgt6'

# Database
# https://docs.djangoproject.com/en/1.6/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.dummy',
        #~ 'USER': '',
        #~ 'PASSWORD': '',
        #~ 'HOST': '', 
        #~ 'PORT': '', 
    }
}

ALLOWED_HOSTS = ['127.0.0.1', 'localhost']

ADMINS = (
    ('admin', 'info@mysmile.com.ua'),
)


# """Celery settings
# """
#
# ## Broker settings.
# BROKER_URL = 'mongodb://localhost:27017/chat_clear'
#
# # List of modules to import when celery starts.
# CELERY_IMPORTS = (
#     'apps.chat.tasks',
# )
#
# ## Using the database to store task state and results.
# CELERY_RESULT_BACKEND = 'mongodb://localhost:27017/chat_clear'
#
# CELERY_MONGODB_BACKEND_SETTINGS = {
#     'database': 'chat_clear',
#     'taskmeta_collection': 'cclogg',
# }
# CELERY_ANNOTATIONS = {'tasks.add': {'rate_limit': '10/s'}}


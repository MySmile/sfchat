# -*- coding: utf-8 -*-
# secret settings
import os
from mongoengine import connect

from sfchat.settings.base import BASE_DIR


MONGODB_DATABASE_NAME = 'sfchat'
MONGODB_HOST = 'localhost'
MONGODB_PORT = 27017
MONGODB_USERNAME = ''
MONGODB_PASSWORD = ''

connect(MONGODB_DATABASE_NAME,
        host=MONGODB_HOST,
        port=MONGODB_PORT,
        username=MONGODB_USERNAME,
        password=MONGODB_PASSWORD)

DEBUG = True

COMPRESS_ENABLED = False

TEMPLATE_DEBUG = DEBUG

INTERNAL_IPS = '127.0.0.1'
DEBUG_TOOLBAR_PATCH_SETTINGS = True

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

# Google Analytics
GOOGLE_ANALYTICS_TRACKING_ID = 'UA-57194449-2'
GOOGLE_ANALYTICS_DEBUG_MODE = True

MEDIA_ROOT = os.path.join(BASE_DIR, '/media/')
STATIC_ROOT = os.path.join(BASE_DIR, 'sfchat/static/')
COMPRESS_ROOT = STATIC_ROOT

try:
    RQ_QUEUES = {
        'default': {
            'HOST': 'localhost',
            'PORT': 6379,
            'DB': 0,
            'PASSWORD': '',
            'DEFAULT_TIMEOUT': 360,
        },
        # 'high': {
        #     'URL': os.getenv('REDISTOGO_URL', 'redis://localhost:6379'), # If you're on Heroku
        #     'DB': 0,
        #     'DEFAULT_TIMEOUT': 500,
        # },
        # 'low': {
        #     'HOST': 'localhost',
        #     'PORT': 6379,
        #     'DB': 0,
        # }
    }
except Exception as err:
    pass

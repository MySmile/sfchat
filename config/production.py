# -*- coding: utf-8 -*-
# secret settings for deploy SFChat
import os
from mongoengine import connect

from sfchat.settings.base import BASE_DIR


MONGODB_DATABASE_NAME = ''
MONGODB_HOST = ''
MONGODB_PORT = None
MONGODB_USERNAME = ''
MONGODB_PASSWORD = ''

connect(MONGODB_DATABASE_NAME,
        host=MONGODB_HOST,
        port=MONGODB_PORT,
        username=MONGODB_USERNAME,
        password=MONGODB_PASSWORD)

DEBUG = False

COMPRESS_ENABLED = True

TEMPLATE_DEBUG = DEBUG

# INTERNAL_IPS = '127.0.0.1'

SECRET_KEY = ''

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

ALLOWED_HOSTS = ['', '']

ADMINS = (
    ('admin', 'info@mysmile.com.ua'),
)

# Google Analytics
GOOGLE_ANALYTICS_TRACKING_ID = ''
GOOGLE_ANALYTICS_DEBUG_MODE = True

MEDIA_ROOT = ''
STATIC_ROOT = ''
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

FORCE_SCRIPT_NAME = ''

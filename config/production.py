# -*- coding: utf-8 -*-
# secret settings for deploy SFChat
import os
from mongoengine import connect

from sfchat.settings.base import BASE_DIR


DEBUG = False

COMPRESS_ENABLED = True

DEBUG_TOOLBAR_PATCH_SETTINGS = False
# @NOTE: if True then enable 'debug_toolbar.middleware.DebugToolbarMiddleware' also

SECRET_KEY = ''

MONGODB_DATABASE_NAME = 'sfchat'
MONGODB_HOST = 'localhost'
MONGODB_PORT = 27017
MONGODB_USERNAME = ''
MONGODB_PASSWORD = ''

connect(MONGODB_DATABASE_NAME,
        host=MONGODB_HOST,
        port=MONGODB_PORT,
        username=MONGODB_USERNAME,
        password=MONGODB_PASSWORD,
        alias='sfchat')

# Database
# https://docs.djangoproject.com/en/1.8/ref/settings/#databases
DATABASES = {
     'sfchat': {
         'ENGINE': 'django.db.backends.dummy',
     },
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'sfchat/db/sfchat_admin.sqlite3'),
    }
}

ALLOWED_HOSTS = ['127.0.0.1', 'localhost']

ADMINS = (
    ('admin', 'info@mysmile.com.ua'),
)

# Google Analytics
GOOGLE_ANALYTICS_TRACKING_ID = 'UA-57194449-2'
GOOGLE_ANALYTICS_DEBUG_MODE = True

MEDIA_ROOT = ''
STATIC_ROOT = ''

COMPRESS_ROOT = STATIC_ROOT

DATABASE_ROUTERS = ['apps.chat.router.SFChatRouter', 'apps.chat.router.AdminRouter',]

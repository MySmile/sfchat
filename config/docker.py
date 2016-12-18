# -*- coding: utf-8 -*-
# secret settings
import os
from mongoengine import connect

from sfchat.settings.base import BASE_DIR


DEBUG = True

COMPRESS_ENABLED = False

DEBUG_TOOLBAR_PATCH_SETTINGS = True
# @NOTE: if True then enable 'debug_toolbar.middleware.DebugToolbarMiddleware' also

SECRET_KEY = '&ku!ebrl5h61ztet=c&ydh+sc9tkq=b70^xbx461)l1pp!lgt6'

MONGODB_DATABASE_NAME = 'sfchat'
MONGODB_HOST = 'sfchat-mongo'
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

ALLOWED_HOSTS = ['127.0.0.1', 'localhost', 'sfchat.dev']

# Google Analytics
GOOGLE_ANALYTICS_TRACKING_ID = 'UA-57194449-4'
GOOGLE_ANALYTICS_DEBUG_MODE = True

MEDIA_ROOT = os.path.join(BASE_DIR, 'sfchat/media/')
STATIC_ROOT = os.path.join(BASE_DIR, 'sfchat/static/')
COMPRESS_ROOT = STATIC_ROOT

DATABASE_ROUTERS = ['apps.chat.router.SFChatRouter', 'apps.chat.router.AdminRouter',]

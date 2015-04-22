# -*- coding: utf-8 -*-
# secret settings
import os
from mongoengine import connect, register_connection

from sfchat.settings.base import BASE_DIR


DEBUG = True

COMPRESS_ENABLED = False

DEBUG_TOOLBAR_PATCH_SETTINGS = False
# @NOTE: if True then enable 'debug_toolbar.middleware.DebugToolbarMiddleware' also


TEMPLATE_DEBUG = DEBUG

INTERNAL_IPS = '127.0.0.1'

SECRET_KEY = '&ku!ebrl5h61ztet=c&ydh+sc9tkq=b70^xbx461)l1pp!lgt6'

DEFAULT_CONNECTION_NAME = 'sfchat'
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

# Database
# https://docs.djangoproject.com/en/1.6/ref/settings/#databases
DATABASES = {
     'sfchat': {
         'ENGINE': 'django.db.backends.dummy',
     },
      # 'sfchat': {
        # 'ENGINE': 'django.db.backends.dummy',
    #     #~ 'USER': '',
    #     #~ 'PASSWORD': '',
    #     #~ 'HOST': '',
    #     #~ 'PORT': '',
    #   },
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'sfchat/db/sfchat_admin.sqlite3'),
        # 'USER': '',
        # 'PASSWORD': '',
        # 'HOST': '',
        # 'PORT': '',
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


DATABASE_ROUTERS = ['apps.chat.router.SFChatRouter', 'apps.chat.router.AdminRouter',]

# -*- coding: utf-8 -*-
"""
Django settings/local.py for SFChat development project.
"""
import os

from config.local import *
from .base import *


APP_MIDDLEWARE_CLASSES = (
    'apps.api.middlewares.VersionSwitchMiddleware',
    'apps.chat.middlewares.ExceptionLoggingMiddleware',
)

THIRD_PARTY_MIDDLEWARE_CLASSES = (
    'debug_toolbar.middleware.DebugToolbarMiddleware',
)

MIDDLEWARE_CLASSES = DJANGO_MIDDLEWARE_CLASSES + APP_MIDDLEWARE_CLASSES + THIRD_PARTY_MIDDLEWARE_CLASSES


# Apps specific for this project go here.
LOCAL_APPS = (
    'apps.adminpanel',
    'apps.api.v1',
    'apps.chat',
    'apps.csp', # content security policy
    'apps.flatpages',
    'apps.home',
    'apps.sitemap',
)


# @TODO: enable
#    'mongoengine.django.mongo_auth',
#    'rest_framework.authtoken',
# in THIRD_PARTY_APPS settings
# and exclude ('mongo_auth', 'authtoken') in admin datadase with router

# Third party apps
THIRD_PARTY_APPS = (
    # 'mongoengine.django.mongo_auth',
    'rest_framework',
    # 'rest_framework.authtoken',
    'compressor',
    'debug_toolbar',
)


INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS

# find js
STATICFILES_DIRS = (os.path.join(STATIC_ROOT, 'js/app/'), ) if not os.path.isdir(os.path.join(STATIC_ROOT, 'js/build/')) \
    else (os.path.join(STATIC_ROOT, 'js/build/'), )


# compressor settings
STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    # other finders..
    'compressor.finders.CompressorFinder',
)

CSRF_FAILURE_VIEW = 'apps.home.utils.csrf_failure'


COMPRESS_CSS_FILTERS = ['compressor.filters.css_default.CssAbsoluteFilter',  'compressor.filters.cssmin.CSSMinFilter']

TIME_ZONE = 'Europe/London'


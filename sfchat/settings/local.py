# -*- coding: utf-8 -*-
"""
Django settings/local.py for SFChat development project.
"""
import os
import datetime

from config.local import *
from .base import *

# Apps specific for this project go here.
LOCAL_APPS = (
    'apps',
    'apps.api.v1',
    'apps.chat',
    'apps.csp', # content security policy
    'apps.flatpages',
    'apps.home',
    'apps.sitemap',
    # 'tests',
)

INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS

MEDIA_ROOT = os.path.join(BASE_DIR, '/media/')
STATIC_ROOT = os.path.join(BASE_DIR, 'sfchat/static/')

STATICFILES_DIRS = (
    os.path.join(STATIC_ROOT, 'bower_components/jquery/dist/'),
)

# compressor settings
STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    # other finders..
    'compressor.finders.CompressorFinder',
)

COMPRESS_ENABLED = False

COMPRESS_CSS_FILTERS = ['compressor.filters.css_default.CssAbsoluteFilter',  'compressor.filters.cssmin.CSSMinFilter']

# Google Analytics
GOOGLE_ANALYTICS_TRACKING_ID = 'UA-57194449-2'
GOOGLE_ANALYTICS_DEBUG_MODE = True

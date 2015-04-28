# -*- coding: utf-8 -*-
"""
Django settings/production.py for deploy SFChat server.
"""
import os

from config.production import *
from .base import *


APP_MIDDLEWARE_CLASSES = (
    'apps.api.middlewares.VersionSwitchMiddleware',
    'apps.chat.middlewares.ExceptionLoggingMiddleware',
)

THIRD_PARTY_MIDDLEWARE_CLASSES = ()

MIDDLEWARE_CLASSES = DJANGO_MIDDLEWARE_CLASSES + APP_MIDDLEWARE_CLASSES + THIRD_PARTY_MIDDLEWARE_CLASSES


# Apps specific for this project go here.
LOCAL_APPS = (
    'apps.api.v1',
    'apps.chat',
    'apps.csp', #  content security policy
    'apps.flatpages',
    'apps.home',
    'apps.sitemap',
)


# Third party apps
THIRD_PARTY_APPS = (
    'rest_framework',
    'rest_framework.authtoken',
    'compressor',
    'django_rq',
)


INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS

# compressor settings
STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    # other finders..
    'compressor.finders.CompressorFinder',
)

CSRF_FAILURE_VIEW = 'apps.home.utils.csrf_failure'


COMPRESS_CSS_FILTERS = ['compressor.filters.css_default.CssAbsoluteFilter',  'compressor.filters.cssmin.CSSMinFilter']

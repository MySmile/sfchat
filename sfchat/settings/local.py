# -*- coding: utf-8 -*-
"""
Django settings/local.py for SFChat development project.
"""
import os
import datetime
import tempfile

from config.local import *
from .base import *

# Apps specific for this project go here.
LOCAL_APPS = (
    'apps.api',
    'apps.chat',
    'apps.flatpages',
    'apps.home',
)

INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS

# See: https://docs.djangoproject.com/en/dev/ref/settings/#installed-apps
INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS

MEDIA_ROOT = os.path.join(BASE_DIR, '/media/')
STATIC_ROOT = os.path.join(BASE_DIR, '')

# A sample logging configuration. The only tangible logging
# performed by this configuration is to send an email to
# the site admins on every HTTP 500 error when DEBUG=False.
# See http://docs.djangoproject.com/en/dev/topics/logging for
# more details on how to customize your logging configuration.
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
         'verbose': {
             'format' : "[%(asctime)s] %(levelname)s [%(name)s:%(lineno)s] %(message)s",
             'datefmt' : "%d/%b/%Y %H:%M:%S"
         },
         'simple': {
             'format': '%(levelname)s %(message)s'
         },
     },
    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse'
        }
    },
    'handlers': {
        #~ 'mail_admins': {
            #~ 'level': 'DEBUG',
            #~ 'filters': ['require_debug_false'],
            #~ 'class': 'django.utils.log.AdminEmailHandler'
        #~ },
        'file': {
               'level': 'INFO',
               'class': 'logging.FileHandler',
               'filename': os.path.join(BASE_DIR,  'log/ERRORS/info_'+datetime.datetime.now().strftime('%Y-%m-%d')+'.log'),
               'formatter': 'verbose'
           },        
    },
    'loggers': {
        #~ 'django.request': {
            #~ 'handlers': ['mail_admins'],
            #~ 'level': 'DEBUG',
            #~ 'propagate': True,
        #~ },
        'django.request': {
        'handlers': ['file'],
        'level': 'ERROR',
        },
    }
}

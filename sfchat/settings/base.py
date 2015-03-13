# -*- coding: utf-8 -*-

"""
Django settings for sfchat project.

For more information on this file, see
https://docs.djangoproject.com/en/1.7/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.7/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os
import datetime


BASE_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), '..')

# Django Application definition
DJANGO_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
)

DJANGO_MIDDLEWARE_CLASSES = (
    'django.middleware.common.BrokenLinkEmailsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.locale.LocaleMiddleware', 
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

ROOT_URLCONF = 'sfchat.urls'

WSGI_APPLICATION = 'sfchat.wsgi.application'

# Internationalization
# https://docs.djangoproject.com/en/1.7/topics/i18n/
LANGUAGES = (
    ('en', 'English'),
    #~ ('pl', 'Polska'),
)

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Europe/London'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.7/howto/static-files/

STATIC_URL = '/static/'


TEMPLATE_DIRS = (
    os.path.join(BASE_DIR, 'sfchat/templates/'),
)

TEMPLATE_CONTEXT_PROCESSORS = (
    "django.contrib.auth.context_processors.auth",
    "django.core.context_processors.debug",
    "django.core.context_processors.i18n",
    "django.core.context_processors.media",
    "django.core.context_processors.static",
    "django.core.context_processors.tz",
    "django.contrib.messages.context_processors.messages",

    'django.core.context_processors.request',
    'django.core.context_processors.csrf',
)


LOCALE_PATHS = (
    os.path.join(BASE_DIR, 'locale/'),
)




# mongoengine settings
# AUTHENTICATION_BACKENDS = (
#     'mongoengine.django.auth.MongoEngineBackend',
# )
#
# AUTH_USER_MODEL = 'mongo_auth.MongoUser'
# MONGOENGINE_USER_DOCUMENT = 'mongoengine.django.auth.User'
#
# SESSION_ENGINE = 'mongoengine.django.sessions'
# SESSION_SERIALIZER = 'mongoengine.django.sessions.BSONSerializer'

#~ global settings for a REST framework API
REST_FRAMEWORK = {
    # Use Django's standard `django.contrib.auth` permissions,
    # or allow read-only access for unauthenticated users.
    'DEFAULT_PERMISSION_CLASSES': [
        # 'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly'
        'rest_framework.permissions.IsAdminUser'
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': (
        # 'rest_framework.authentication.BasicAuthentication',
        # 'rest_framework.authentication.SessionAuthentication',
        # 'rest_framework.authentication.TokenAuthentication',
        'apps.api.v1.authentication.TokenAuthentication',
    ),

    'EXCEPTION_HANDLER': 'apps.api.v1.utils.custom_exception_handler'
}

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False, #the default configuration is completely overridden
    'formatters': {
         'verbose': {
             'format' : "[%(asctime)s] %(levelname)s [%(name)s:%(lineno)s] %(message)s",
             'datefmt' : "%d/%b/%Y %H:%M:%S"
         },
         'simple': {
             'format': '%(levelname)s %(message)s'
         },
         'rq_console': {
            "format": "%(asctime)s %(message)s",
            "datefmt": "%H:%M:%S",
        },
     },
    'filters': {
        'require_debug_true': {
            '()': 'django.utils.log.RequireDebugTrue'
        },
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse'
        },

    },
    'handlers': {
        'file_info': {
               'level': 'INFO',
               'class': 'logging.handlers.RotatingFileHandler',
               'formatter': 'verbose',
               'filters': ['require_debug_true'],
               'filename': os.path.join(BASE_DIR,  'log/'+datetime.datetime.now().strftime('%Y-%m-%d')+'_INFO.log'),
               'maxBytes': 1024*1024*5, # 5 MB
               'backupCount': 5
           },
        'file_error': {
               'level': 'ERROR',
               'class': 'logging.handlers.RotatingFileHandler',
               'formatter': 'verbose',
               'filters': ['require_debug_true'],
               'filename': os.path.join(BASE_DIR,  'log/'+datetime.datetime.now().strftime('%Y-%m-%d')+'_ERROR.log'),
               'maxBytes': 1024*1024*5, # 5 MB
               'backupCount': 5
           },
        'mail_admins': {
            'level': 'ERROR',
            'class': 'django.utils.log.AdminEmailHandler',
            'filters': ['require_debug_false']
        },
        'rq_file': {
               'level': 'DEBUG',
               'class': 'logging.handlers.RotatingFileHandler',
               'formatter': 'rq_console',
               'filters': ['require_debug_true', 'require_debug_false'],
               'filename': os.path.join(BASE_DIR,  'log/'+datetime.datetime.now().strftime('%Y-%m-%d')+'_PythonRQ.log'),
               'maxBytes': 1024*1024*5, # 5 MB
               'backupCount': 5
           },
        'rq_console': {
            'level': 'DEBUG',
            'class': 'rq.utils.ColorizingStreamHandler',
            'exclude': ["%(asctime)s"],
            'filters': ['require_debug_true'],
        },
    },
    
    'loggers': {
        '': {
            'handlers': ['file_info', 'file_error'],
            'level': 'DEBUG',
            'propagate': False,
        },
        'django.request': {
            'handlers': ['mail_admins'],
            'level': 'ERROR',
            'propagate': False,
        },
        "rq.worker": {
            "handlers": ["rq_console", 'rq_file'],
            "level": "DEBUG"
        },
    },
}

TEST_RUNNER = "sfchat.settings.test.NoSQLTestRunner"

SFCHAT_API = {
    'authentication': {
        'user_token_header': 'HTTP_X_SFC_USERTOKEN',
        'chat_token_header': 'HTTP_X_SFC_CHATTOKEN'
    },
    'long_polling': {
        'sleep': 3,
        'iteration': 60
    },
}

CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.filebased.FileBasedCache',
        'LOCATION': os.path.join(BASE_DIR, 'sfchat/static/CACHE/flatpages/'),
        'TIMEOUT': None,
    }
}

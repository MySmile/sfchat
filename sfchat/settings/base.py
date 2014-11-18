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

BASE_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)),'..')

# Django Application definition
DJANGO_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
)

# Third party apps
THIRD_PARTY_APPS = (
    'rest_framework',
    'rest_framework.authtoken',
)


MIDDLEWARE_CLASSES = (
    'django.middleware.common.BrokenLinkEmailsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.locale.LocaleMiddleware', 
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',

    'apps.api.middlewares.VersionSwitchMiddleware',
    'apps.chat.middlewares.ExceptionLoggingMiddleware',
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

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.7/howto/static-files/

STATIC_URL = '/static/'

STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'sfchat/static'),
    os.path.join(BASE_DIR, 'sfchat/static/bower_components/jquery/dist'),
)

TEMPLATE_DIRS = (
    os.path.join(BASE_DIR, 'sfchat/templates/'),
)

LOCALE_PATHS = (
    os.path.join(BASE_DIR, 'locale/'),
)

# mongoengine settings
AUTHENTICATION_BACKENDS = (
    'mongoengine.django.auth.MongoEngineBackend',
)

SESSION_ENGINE = 'mongoengine.django.sessions'
SESSION_SERIALIZER = 'mongoengine.django.sessions.BSONSerializer'

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
               'filename': os.path.join(BASE_DIR,  'log/'+datetime.datetime.now().strftime('%Y-%m-%d')+'.log'),
               'maxBytes': 1024*1024*5, # 5 MB
               'backupCount': 5
           },
        'file_error': {
               'level': 'ERROR',
               'class': 'logging.handlers.RotatingFileHandler',
               'formatter': 'verbose',
               'filters': ['require_debug_true'],
               'filename': os.path.join(BASE_DIR,  'log/'+datetime.datetime.now().strftime('%Y-%m-%d')+'.log'),
               'maxBytes': 1024*1024*5, # 5 MB
               'backupCount': 5
           },
        'mail_admins': {
            'level': 'ERROR',
            'class': 'django.utils.log.AdminEmailHandler',
            'filters': ['require_debug_false']
        }           
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
    },
}

TEST_RUNNER = "sfchat.settings.test.NoSQLTestRunner"

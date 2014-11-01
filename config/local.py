# secret settings
import os

SECRET_KEY = '&ku!ebrl5h61ztet=c&ydh+sc9tkq=b70^xbx461)l1pp!lgt6'

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

ALLOWED_HOSTS = ['127.0.0.1', 'localhost']

ADMINS = (
    ('admin', 'info@mysmile.com.ua'),
)


from mongoengine import connect
connect('sfchattest', host='localhost', port=27017, username='', password='')

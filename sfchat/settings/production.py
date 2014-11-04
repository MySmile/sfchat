
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
               'level': 'ERROR',
               'class': 'logging.FileHandler',
               'filename': os.path.join(BASE_DIR,  'log/ERRORS/'+datetime.datetime.now().strftime('%Y-%m-%d')+'_errors.log'),
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

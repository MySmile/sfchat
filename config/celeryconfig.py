from datetime import timedelta
from mongoengine import connect

from celery.schedules import crontab


CELERY_SEND_TASK_ERROR_EMAILS = True

BROKER_URL = 'mongodb://localhost:27017/celery_sfchat'

CELERY_RESULT_BACKEND = 'mongodb'
CELERY_MONGODB_BACKEND_SETTINGS = {
   'database': 'celery_sfchat',
   'taskmeta_collection': 'stock_taskmeta_collection',
}

#used to schedule tasks periodically and passing optional arguments
#Can be very useful. Celery does not seem to support scheduled task but only periodic
CELERYBEAT_SCHEDULE = {
   'every-minute': {
       'task': 'apps.chat.tasks.clear_chats',
       # 'schedule': crontab(minute='*/1'),
       'schedule': timedelta(seconds=2),
       'args': (),
   },
}

connect('sfchat', host='localhost', port=27017, username='', password='')


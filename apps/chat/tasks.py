from celery import Celery
from datetime import date, timedelta
from mongoengine.queryset import Q
from apps.chat.models import Chats

import logging
logger = logging.getLogger(__name__)

#Specify mongodb host and datababse to connect to
BROKER_URL = 'mongodb://localhost:27017/celery_sfchat'

celery = Celery('clear_chats', broker=BROKER_URL)

#Loads settings for Backend to store results of jobs
celery.config_from_object('config.celeryconfig')


@celery.task
def clear_chats():
    try:
        yesterday = date.today() - timedelta(1)
        chats = Chats.objects(Q(status='closed') | Q(created__lte=yesterday))
        num = len(chats)
        chats.delete()
        return str(num) + ' chats cleaned!'
    except Exception as err:
        logger.error(err)




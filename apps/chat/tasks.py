from datetime import date, timedelta

from mongoengine.queryset import Q
# from django.conf import settings
from django_rq import job

from apps.chat.models import Chats

import logging
logger = logging.getLogger(__name__)


@job('default')
def clear_chats():
    try:
        yesterday = date.today() - timedelta(1)
        chats = Chats.objects(Q(status='closed') | Q(created__lte=yesterday))
        num = len(chats)
        chats.delete()
        return str(num) + ' chats cleaned!'
    except Exception as err:
        logger.error(err)

clear_chats.delay() # Enqueue function in "default" queue


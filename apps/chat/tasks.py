from datetime import date, timedelta

from mongoengine.queryset import Q

from apps.chat.models import Chats

import logging
logger = logging.getLogger(__name__)


def clear_chats():
    try:
        yesterday = date.today() - timedelta(1)
        chats = Chats.objects(Q(status='closed') | Q(created__lte=yesterday))
        msg = str(len(chats)) + ' chat(s) cleaned!'
        chats.delete()
        logger.info(msg)
        return msg
    except Exception as err:
        logger.error(err)

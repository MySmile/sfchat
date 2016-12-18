from django.core.management.base import BaseCommand, CommandError

from apps.chat.models import Chats

import logging
logger = logging.getLogger(__name__)


class Command(BaseCommand):
    def __init__(self, *args, **kwargs):
        self.result = {}
        super(Command, self).__init__(*args, **kwargs)
    CHAT_LIFETIME = 1 #  chat lifetime in days
    help = 'Close and delete old chats'

    def handle(self, *args, **options):
        try:
            # delete closed chats
            deleted_chats = Chats.delete_closed_chat()
            # auto close chats by time limit
            chats = Chats.objects.get_old_chat(self.CHAT_LIFETIME)
            closed_chats = len(chats)
            for chat in chats:
                chat.pre_delete()
            msg = str(closed_chats) + ' chat(s) closed, ' + str(deleted_chats) + ' chat(s) deleted!'
            logger.setLevel(20) #  INFO
            logger.info(msg)
            self.result = {'level': logger.level, 'msg':msg}


        except Exception as err:
            # @TODO Fix. Error: Chats matching query does not exist.
            msg = 'Error: ' + str(err)
            logger.setLevel(40) #  ERROR
            logger.error(msg)
            self.result = {'level': logger.level, 'msg':msg}

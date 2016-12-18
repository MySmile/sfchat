import time

from django.conf import settings
from rest_framework.views import exception_handler

from apps.chat.models import Chats

import logging
logger = logging.getLogger(__name__)


def custom_exception_handler(exc):
    # Call REST framework's default exception handler first,
    # to get the standard error response.
    response = exception_handler(exc)

    # Now add the HTTP status code to the response.
    if response is not None:
        response.data = {'results': {'code': response.status_code, 'msg': response.data['detail']}}

    return response


class LongPolling:
    @staticmethod
    def run(chat, user_token):
        """
        Run long polling
        :param chat: Chats
        :param user_token: String
        :return Chats
        """
        sleep = settings.SFCHAT_API['long_polling']['sleep']
        iteration = settings.SFCHAT_API['long_polling']['iteration']
        auto_close = 1.2 * sleep * iteration
        chat_token = str(chat.id)

        # init long polling process and terminate all old ones
        init_polling_id = chat.create_long_polling(user_token)
        actual_polling_id = init_polling_id

        # run long polling
        i = 1
        while i < iteration \
                and chat.count == 0 \
                and chat.status != Chats.STATUS_CLOSED \
                and init_polling_id == actual_polling_id:
            time.sleep(sleep)
            chat = Chats.get_chat(chat_token, user_token)
            long_polling = chat.get_long_polling(user_token)
            actual_polling_id = str(long_polling._id) if long_polling else False
            i += 1

        # close automatically chat if talker close browser or tab
        chat.auto_close_long_polling(user_token, auto_close)

        return Chats.get_chat(chat_token, user_token)
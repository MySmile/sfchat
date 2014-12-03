import time

from django.conf import settings
from rest_framework.views import exception_handler

from apps.api.v1.serializers import ChatMessagesSerializer
from apps.chat.models import Chats


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
    def run(chat_serialized, chat_token, user_token):
        """
        Run long polling
        :param chat_serialized: Dictionary
        :param chat_token: String
        :param user_token: String
        :return: Dictionary
        """
        sleep = settings.SFCHAT_API['long_polling']['sleep']
        iteration = settings.SFCHAT_API['long_polling']['iteration']

        # init long polling process and terminate all old ones
        chat = Chats.get_chat(chat_token, user_token)
        init_polling_id = chat.create_long_polling(user_token)
        # get actual long polling
        actual_polling_id = init_polling_id

        # run long polling
        i = 1
        while i < iteration \
                and chat_serialized.data['count'] == 0 \
                and chat_serialized.data['status'] != Chats.STATUS_CLOSED \
                and init_polling_id == actual_polling_id:
            time.sleep(sleep)
            chat = Chats.get_chat(chat_token, user_token)
            long_polling = chat.get_long_polling(user_token)
            actual_polling_id = str(long_polling._id) if long_polling else False
            chat_serialized = ChatMessagesSerializer(chat)
            i += 1
        # clear long polling
        chat.delete_long_polling(user_token)

        return chat_serialized
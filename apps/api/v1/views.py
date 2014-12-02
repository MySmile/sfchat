import time

from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import ParseError
from apps.api.v1.serializers import ChatMessagesSerializer
from apps.api.v1.authentication import TokenAuthentication
from apps.chat.models import Chats


class MessagesView(APIView):
    RESPONSE_SUCCESS = {'results': {'code': 200, 'msg': 'Ok'}}
    LONG_POLLING_SLEEP = settings.SFCHAT_API['long_polling']['sleep']
    LONG_POLLING_ITERATION = settings.SFCHAT_API['long_polling']['iteration']

    def get(self, request, format=None):
        """
        List all messages related to current user
        """
        long_polling = request.GET.get('longPolling', 'True')
        chat_token = TokenAuthentication.get_chat_token(request)
        user_token = TokenAuthentication.get_user_token(request)

        serializer = ChatMessagesSerializer(request.user)
        i = 1
        while long_polling == 'True' and i < self.LONG_POLLING_ITERATION \
                and serializer.data['count'] == 0 \
                and serializer.data['status'] != Chats.STATUS_CLOSED:
            time.sleep(self.LONG_POLLING_SLEEP)
            chat = Chats.get_chat(chat_token, user_token)
            serializer = ChatMessagesSerializer(chat)
            i += 1

        response = {'results': serializer.data}
        return Response(response)

    def post(self, request, format=None):
        """
        Add new message
        """
        data = self.request.DATA
        user_token = request.META.get(TokenAuthentication.USER_TOKEN_HEADER)
        if not 'data' in data or not 'messages' in data['data'] or \
                not request.user.add_message(user_token=user_token, messages=data['data']['messages']):
            raise ParseError()

        return Response(self.RESPONSE_SUCCESS)

    def delete(self, request, format=None):
        """
        Delete message
        """
        data = self.request.DATA
        if not 'data' in data or not 'messages' in data['data'] or \
                not request.user.delete_message(messages=data['data']['messages']):
            raise ParseError()

        return Response(self.RESPONSE_SUCCESS)


class ChatView(APIView):
    RESPONSE_SUCCESS = {'results': {'code': 200, 'msg': 'Ok'}}

    def delete(self, request, format=None):
        """
        Delete chat
        """
        user_token = request.META.get(TokenAuthentication.USER_TOKEN_HEADER)
        request.user.delete_chat(user_token)

        return Response(self.RESPONSE_SUCCESS)
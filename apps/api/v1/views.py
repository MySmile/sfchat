import time

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import ParseError
from apps.api.v1.serializers import ChatMessagesSerializer
from apps.api.v1.authentication import TokenAuthentication
from apps.chat.models import Chats


class MessagesView(APIView):
    RESPONSE_SUCCESS = {'results': {'code': 200, 'msg': 'Ok'}}
    LONG_POLLING_SLEEP = 2

    def get(self, request, format=None):
        """
        List all messages related to current user
        """
        long_polling = request.GET.get('longPolling', 'True')
        chat_token = TokenAuthentication.get_chat_token(request)
        user_token = TokenAuthentication.get_user_token(request)

        serializer = ChatMessagesSerializer(request.user)
        while long_polling == 'True' and serializer.data['count'] == 0:
            time.sleep(self.LONG_POLLING_SLEEP)
            chat = Chats.get_chat(chat_token, user_token)
            serializer = ChatMessagesSerializer(chat)

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
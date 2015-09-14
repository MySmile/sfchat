from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import ParseError

from apps.api.v1.serializers import ChatMessagesSerializer
from apps.api.v1.authentication import TokenAuthentication
from apps.api.v1.utils import LongPolling


class MessagesView(APIView):
    RESPONSE_SUCCESS = {'results': {'code': 200, 'msg': 'Ok'}}

    def get(self, request, format=None):
        """
        List all messages related to current user
        """
        long_polling = request.GET.get('longPolling', 'True')
        user_token = TokenAuthentication.get_user_token(request)
        chat = LongPolling.run(request.user, user_token) if long_polling == 'True' else request.user

        serializer = ChatMessagesSerializer(chat)
        response = {'results': serializer.data}
        headers = {'Pragma': 'no-cache',
                   'Cache-Control': 'no-cache, private, must-revalidate, max-stale=0, post-check=0, pre-check=0, no-store',
                   'Expires': 'Sat, 27 2014 21:41:18 GMT'
        }
        return Response(response, headers=headers)

    def post(self, request, format=None):
        """
        Add new message
        """
        data = self.request.data
        user_token = TokenAuthentication.get_user_token(request)
        if not 'data' in data or not 'messages' in data['data'] or \
                not request.user.add_message(user_token=user_token, messages=data['data']['messages']):
            raise ParseError()

        return Response(self.RESPONSE_SUCCESS)

    def delete(self, request, format=None):
        """
        Delete message
        """
        data = self.request.data
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
        user_token = TokenAuthentication.get_user_token(request)
        request.user.close_chat(user_token)

        return Response(self.RESPONSE_SUCCESS)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import ParseError
from apps.api.serializers import ChatMessagesSerializer
from apps.api.authentication import TokenAuthentication


class Messages(APIView):
    RESPONSE_SUCCESS = {'results': {'code': 200, 'msg': 'Ok'}}

    def get(self, request, format=None):
        """
        List all messages related to current user
        """
        serializer = ChatMessagesSerializer(request.user)
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
        user_token = request.META.get(TokenAuthentication.USER_TOKEN_HEADER)
        if not 'data' in data or not 'messages' in data['data'] or \
                not request.user.delete_message(messages=data['data']['messages']):
            raise ParseError()

        return Response(self.RESPONSE_SUCCESS)
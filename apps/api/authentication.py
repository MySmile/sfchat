from django.contrib.auth.models import User
from rest_framework import authentication
from rest_framework import exceptions
from apps.chat.models import Chats


class TokenAuthentication(authentication.BaseAuthentication):
    USER_TOKEN_HEADER = 'X-SFC-userToken'
    CHAT_TOKEN_PARAMETER = 'chatToken'

    def authenticate(self, request):
        chat_token = request.GET.get(self.CHAT_TOKEN_PARAMETER)
        user_token = request.META.get(self.USER_TOKEN_HEADER)

        if not user_token or not chat_token:
            return None

        chat = Chats.get_chat(chat_token, user_token)
        if not chat:
            raise exceptions.AuthenticationFailed('Unauthorized')

        return (chat, None)

    @staticmethod
    def validate_chat_token(chat_token):
        if not Chats.validate_chat_token(chat_token):
            raise exceptions.AuthenticationFailed('Unauthorized')

        return True
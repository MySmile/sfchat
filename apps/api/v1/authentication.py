from django.conf import settings
from rest_framework import authentication
from rest_framework import exceptions
from apps.chat.models import Chats


class TokenAuthentication(authentication.BaseAuthentication):
    USER_TOKEN_HEADER = settings.SFCHAT_API['authentication']['user_token_header']
    CHAT_TOKEN_HEADER = settings.SFCHAT_API['authentication']['chat_token_header']

    def authenticate(self, request):
        chat_token = self.get_chat_token(request)
        user_token = self.get_user_token(request)
        if not user_token or not chat_token:
            return None

        try:
            chat = Chats.get_chat(chat_token, user_token)
        except Exception as ex:
            raise exceptions.AuthenticationFailed('Unauthorized')

        return (chat, None)

    @staticmethod
    def validate_chat_token(chat_token):
        """
        Validate chat token
        :param chat_token: String
        :return: True or throws exception
        """
        if not Chats.validate_chat_token(chat_token):
            raise exceptions.AuthenticationFailed('Unauthorized')

        return True

    @staticmethod
    def get_chat_token(request):
        return request.META.get(TokenAuthentication.CHAT_TOKEN_HEADER)

    @staticmethod
    def get_user_token(request):
        return request.META.get(TokenAuthentication.USER_TOKEN_HEADER)
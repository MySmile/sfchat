import unittest
from apps.chat.models import *
from mongoengine import *
from apps.api.v1.authentication import TokenAuthentication
from rest_framework import exceptions
from apps.chat.models import Chats
from django.test.client import HttpRequest


class AuthenticationTestCase(unittest.TestCase):
    # @TODO use Fixtures
    def setUp(self):
        self.chat_token = Chats.create_chat()['chat_token']

    def test_validate_chat_token_success(self):
        actual = TokenAuthentication.validate_chat_token(self.chat_token)
        self.assertTrue(actual)

    def test_validate_chat_token_failed(self):
        lambda_validate = lambda chat_token: TokenAuthentication.validate_chat_token(chat_token)
        self.assertRaises(exceptions.AuthenticationFailed, lambda_validate, '543e33a2e3ce324d374246fc')

    def test_authenticate_success(self):
        user_token = Chats.join_to_chat(self.chat_token)
        request = self.set_http_request(self.chat_token, user_token)

        authentication = TokenAuthentication()
        actual = authentication.authenticate(request)
        self.assertEquals(self.chat_token, str(actual[0].id))

    def test_authenticate_failed(self):
        user_token = '546511c6b82b9c589334cece'
        request = self.set_http_request(self.chat_token, user_token)

        authentication = TokenAuthentication()
        lambda_authenticate = lambda request: authentication.authenticate(request)
        self.assertRaises(exceptions.AuthenticationFailed, lambda_authenticate, request)

    def test_authenticate_none_chat(self):
        user_token = '546511c6b82b9c589334cece'
        request = HttpRequest()
        request.META[TokenAuthentication.USER_TOKEN_HEADER] = user_token

        authentication = TokenAuthentication()
        actual = authentication.authenticate(request)
        self.assertEqual(actual, None)

    def test_authenticate_none_user(self):
        request = HttpRequest()
        request.META[TokenAuthentication.CHAT_TOKEN_HEADER] = self.chat_token

        authentication = TokenAuthentication()
        actual = authentication.authenticate(request)
        self.assertEqual(actual, None)

    def set_http_request(self, chat_token, user_token):
        request = HttpRequest()
        request.META[TokenAuthentication.CHAT_TOKEN_HEADER] = chat_token
        request.META[TokenAuthentication.USER_TOKEN_HEADER] = user_token
        return request
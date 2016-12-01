import unittest

from django.contrib.auth.models import AnonymousUser
from django.test import RequestFactory
from django.contrib.messages.storage.fallback import FallbackStorage

from apps.chat.models import Chats
from apps.chat.utils import ChatPage


class ChatPageTest(unittest.TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        self.tokens = Chats.create_chat()
        self.request = self.factory.get('/chat/'+self.tokens['chat_token'])
        self.request.user = AnonymousUser()

        """
        fix django.contrib.messages.api.MessageFailure:
        You cannot add messages without installing
        django.contrib.messages.middleware.MessageMiddleware
        """
        setattr(self.request, 'session', 'session')
        messages = FallbackStorage(self.request)
        setattr(self.request, '_messages', messages)

        self.chat_page = ChatPage(self.request)


    def test_set_and_get_user_token(self):
        result = self.chat_page.set_user_token(self.tokens['user_token'])
        user_token = self.chat_page.get_user_token()
        self.assertTrue(result)
        self.assertEquals(user_token, self.tokens['user_token'])

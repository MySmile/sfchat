import unittest

from django.test.client import Client
from django.http import HttpResponsePermanentRedirect

from apps.chat.models import Chats


class ChatViewTest(unittest.TestCase):
    def setUp(self):
        self.client = Client()
        self.chat_token = Chats.create_chat()['chat_token']

    def test_chat_url(self):
        response = self.client.get('/chat/'+str(self.chat_token))
        self.assertEqual(response.status_code, 200)





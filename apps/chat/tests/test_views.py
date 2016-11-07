import unittest

from django.test.client import Client

from apps.chat.models import Chats


class ChatViewTest(unittest.TestCase):
    def setUp(self):
        self.client = Client()
        self.chat_token = Chats.create_chat()['chat_token']

    def test_chat_url(self):
        response = self.client.get('/chat/'+str(self.chat_token), follow=True)
        self.assertEqual(response.status_code, 200)

    def test_html_chat_token(self):
        response = self.client.get('/chat/'+str(self.chat_token), follow=True)
        self.assertEqual(response.status_code, 200)
        self.assertIn('<div id="chat-body">', response.content.decode('utf-8'))

import unittest

from django.test.client import Client
from django.http import HttpResponsePermanentRedirect

from apps.home.forms import JoinChatForm
from apps.chat.models import Chats


class HomePageTest(unittest.TestCase):
    def setUp(self):
        self.client = Client()
        self.chat_token = Chats.create_chat()['chat_token']

    def test_index(self):
        response = self.client.get('/', follow=True)
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'<div id="chat-entry">', response.content)
        self.assertIn(b'button id="create_chat"', response.content)
        self.assertIn(b'button id="join_chat"', response.content)

    def test_redirect_after_create(self):
        response = self.client.post('/create-chat/')
        self.assertEqual(response.status_code, 301)
        self.assertTrue(isinstance(response, HttpResponsePermanentRedirect))

    def test_form_JoinChat_success(self):
        form_data = {'chat_token': self.chat_token}
        form = JoinChatForm(data=form_data)
        self.assertEqual(form.is_valid(), True)

    def test_form_JoinChat_failed(self):
        form_data = {'chat_token': '0' * 24}
        form = JoinChatForm(data=form_data)
        self.assertEqual(form.is_valid(), False)

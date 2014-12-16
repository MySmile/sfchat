import unittest

from django.test.client import Client
from apps.home.views import HomeView


class HomePageTest(unittest.TestCase):
    _client = Client()

    def test_index(self):
        response = self._client.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'<div id="chat-entry">', response.content)
        self.assertIn(b'button id="create_chat"', response.content)
        self.assertIn(b'button id="join_chat"', response.content)

    def test_form(self):


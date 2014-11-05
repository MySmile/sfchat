import datetime
from django.test import TestCase
from django.test.client import Client

from mongoengine import *
from mongoengine import connect

class ViewTestCase(TestCase):

    def setUp(self):
        connect('sfchattest', host='localhost', port=27017, username='', password='')
        self.db = get_db()
        self._client = Client()

    def test_view(self):
        response = self._client.get('127.0.0.1:8000')
        self.assertEqual(response.status_code, 200)

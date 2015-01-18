import unittest

from django.test.client import Client
from apps.flatpages.views import FlatpagesView


class FlatpagesViewTest(unittest.TestCase):
    def setUp(self):
        self.template_name = ('privacy', 'faq', 'license')
        self.client = Client()

    def test_view(self):
        for item in self.template_name:
            response = self.client.get('/'+item+'.html')
            self.assertEqual(response.status_code, 200)
            self.assertIn(b'<article>', response.content)

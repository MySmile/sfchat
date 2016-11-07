import unittest
from django.test.client import Client


class SitemapTestView(unittest.TestCase):
    def setUp(self):
        self._client = Client()
        self.response = self._client.get('/sitemap.xml', HTTP_HOST="testdomain.com", follow=True)

    def test_sitemap_response_200(self):
        self.assertEqual(self.response.status_code, 200)

    def test_pages_into_sitemap(self):
        self.assertIn(b'privacy.html', self.response.content)
        self.assertIn(b'faq.html', self.response.content)
        self.assertIn(b'license.html', self.response.content)

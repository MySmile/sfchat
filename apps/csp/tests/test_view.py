import unittest
import json

from django.test.client import Client


class CSPReportTest(unittest.TestCase):
    def setUp(self):
        self.client = Client()
        self.fake_csp_report = {
            "csp-report": {
                'blocked-uri': '',
               'document-uri': '',
               'line-number': '',
               'original-policy': '',
               'referrer': '',
               'script-sample': '',
               'source-file': '',
               'violated-directive': '',
          },
        }

    def test_view(self):
        response = self.client.post('/csp-report',
                                    json.dumps(self.fake_csp_report),
                                    content_type="application/json",
                                    HTTP_USER_AGENT='Mozilla/5.0')
        self.assertEqual(response.status_code, 204)

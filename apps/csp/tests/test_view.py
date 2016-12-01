import unittest
import json

from django.test.client import Client


class CSPReportTest(unittest.TestCase):

    def setUp(self):
        self.client = Client()
        self.csp_report_valid = {"csp-report":
                                    {"blocked-uri":"self",
                                     "document-uri":"https://sfchat.mysmile.com.ua/",
                                     "original-policy":"default-src https://sfchat.mysmile.com.ua data: https://www.google-analytics.com; script-src https://sfchat.mysmile.com.ua https://www.google-analytics.com; object-src 'none'; style-src  https://sfchat.mysmile.com.ua 'unsafe-inline'; img-src https://sfchat.mysmile.com.ua data: https://www.google-analytics.com; media-src 'none'; frame-src 'none'; font-src 'none'; connect-src https://sfchat.mysmile.com.ua https://www.google-analytics.com; report-uri https://sfchat.mysmile.com.ua/csp-report/",
                                     "referrer":"https://sfchat.mysmile.com.ua/chat/5587085c55e430296d487d11",
                                     "violated-directive":"script-src  https://sfchat.mysmile.com.ua https://www.google-analytics.com"
                                     }
                                 }
        self.csp_report_invalid = {"csp":{}}

    def test_view(self):
        response = self.client.post('/csp-report/',
                                    json.dumps(self.csp_report_valid),
                                    content_type='application/csp-report',
                                    HTTP_USER_AGENT='Mozilla/5.0',
                                    follow=True,
                                    secure=True)
        self.assertEqual(response.status_code, 204)

    def test_view_header_failed(self):
        lambda_validate_header = lambda: self.client.post('/csp-report/',
                                                          json.dumps(self.csp_report_valid),
                                                          content_type='application/json',
                                                          HTTP_USER_AGENT='Mozilla/5.0',
                                                          follow=True,
                                                          secure=True)
        self.assertRaises(AttributeError, lambda_validate_header)

    def test_view_json_failed(self):
        lambda_validate_json = lambda: self.client.post('/csp-report/',
                                                          json.dumps(self.csp_report_invalid),
                                                          content_type='application/csp-report',
                                                          HTTP_USER_AGENT='Mozilla/5.0',
                                                          follow=True,
                                                          secure=True)
        self.assertRaises(AttributeError, lambda_validate_json)

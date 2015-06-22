import unittest
import json

from django.test.client import Client


class CSPReportTest(unittest.TestCase):

    def setUp(self):
        self.client = Client()
        self.fake_csp_report = {"csp-report":
                                {"blocked-uri":"self","document-uri":"https://sfchat.mysmile.com.ua/","line-number":26,"original-policy":"default-src https://sfchat.mysmile.com.ua data: https://www.google-analytics.com; script-src https://sfchat.mysmile.com.ua https://www.google-analytics.com; object-src 'none'; style-src  https://sfchat.mysmile.com.ua 'unsafe-inline'; img-src https://sfchat.mysmile.com.ua data: https://www.google-analytics.com; media-src 'none'; frame-src 'none'; font-src 'none'; connect-src https://sfchat.mysmile.com.ua https://www.google-analytics.com; report-uri https://sfchat.mysmile.com.ua/csp-report/","referrer":"https://sfchat.mysmile.com.ua/chat/5587085c55e430296d487d11","script-sample":"\n   $(function (){ // I use jQuery in thi...","source-file":"https://sfchat.mysmile.com.ua/","violated-directive":"script-src  https://sfchat.mysmile.com.ua https://www.google-analytics.com"}}

    def test_view(self):
        response = self.client.post('/csp-report/',
                                    json.dumps(self.fake_csp_report),
                                    content_type="application/json",
                                    HTTP_USER_AGENT='Mozilla/5.0')
        self.assertEqual(response.status_code, 204)

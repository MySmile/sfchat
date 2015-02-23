import unittest
import json
from django.http import HttpRequest
from apps.home.utils import json_html_response
from django.template import RequestContext, loader


class JsonHtmlResponseTestCase(unittest.TestCase):
    def setUp(self):
        self.code = 404
        self.message = 'Not Found'
        self.template_name = '404.html'
        self.content_type = 'application/json'

    def test_json(self):
        request = HttpRequest()
        request.META['CONTENT_TYPE'] = self.content_type
        response = json_html_response(request, self.template_name, self.code, self.message)

        self.assertEqual(self.code, response.status_code)
        self.assertEqual(request.META.get('CONTENT_TYPE'), response['Content-Type'])

        actual = json.loads('{"results": {"code": 404, "msg": "Not Found"}}')
        expected = json.loads(response.content.decode('ascii'))
        self.assertEqual(actual, expected)

    def test_html(self):
        request = HttpRequest()
        response = json_html_response(request, self.template_name, self.code, self.message)

        self.assertEqual(self.code, response.status_code)
        self.assertNotEqual(response['Content-Type'], self.content_type)

        template = loader.get_template(self.template_name)
        content = template.render(RequestContext(request))
        self.assertEqual(content, response.content.decode('ascii'))
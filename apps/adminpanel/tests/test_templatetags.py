import unittest
from django.template import Template, Context
from bson.objectid import ObjectId


class TemplatetagsTestCase(unittest.TestCase):
    def test_mask(self):
        chat = [ObjectId()]
        manage_chats = "{% load mask %}{{ chat.0|mask }}"
        template = Template(manage_chats)

        actual = template.render(Context({'chat' : chat}))
        self.assertRegexpMatches(actual, '^[0-9a-z]\*{6}[0-9a-z]{4}$')

    def test_empty_mask(self):
        chat = []
        manage_chats = "{% load mask %}{{ chat.0|mask }}"
        template = Template(manage_chats)

        actual = template.render(Context({'chat': chat}))
        self.assertEqual('', actual)

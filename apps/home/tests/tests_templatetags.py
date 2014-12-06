import unittest
from django.template import Template, Context


class TemplatetagsTestCase(unittest.TestCase):
    def test_email_protection(self):
        email = "{% load email_protection %}{% email_protection email='test@gmail.com' hide_class='hide' %}"
        template = Template(email)
        actual = template.render(Context({}))
        expected = 't<span class="hide">&nbsp;</span>\
e<span class="hide">&nbsp;</span>\
s<span class="hide">&nbsp;</span>\
t<span class="hide">&nbsp;</span>\
[<span class="hide">&nbsp;</span>\
a<span class="hide">&nbsp;</span>\
t<span class="hide">&nbsp;</span>\
]<span class="hide">&nbsp;</span>\
g<span class="hide">&nbsp;</span>\
m<span class="hide">&nbsp;</span>\
a<span class="hide">&nbsp;</span>\
i<span class="hide">&nbsp;</span>\
l<span class="hide">&nbsp;</span>\
&#46;<span class="hide">&nbsp;</span>\
c<span class="hide">&nbsp;</span>\
o<span class="hide">&nbsp;</span>\
m<span class="hide">&nbsp;</span>'
        self.assertEquals(actual, expected)

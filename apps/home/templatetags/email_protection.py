from django import template
from django.utils.html import format_html

register = template.Library()


@register.simple_tag
def email_protection(email, hide_class):
    """
    Tag to protect email by adding span tag after each character, 
    replace dot with html code, replace @ to [at], 
    :param email: String
    :param hide_class: String
    :return: Mix
    """
    dot = '&#46;'
    pattern = '<span class="' + hide_class + '">&nbsp;</span>'
    at = '[at]'

    email = email.replace('@', at)
    result = ''
    for item in email:
        result += item + pattern
    return format_html(result.replace('.', dot))

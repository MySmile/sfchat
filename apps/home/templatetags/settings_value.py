from django import template
from django.conf import settings

register = template.Library()

ALLOWABLE_VALUES = ('GOOGLE_ANALYTICS_TRACKING_ID', 'GOOGLE_ANALYTICS_DEBUG_MODE',)


@register.simple_tag
def settings_value(name):
    """
    Tag for getting settings values
    :param name: String
    :return: Mix
    """
    if name in ALLOWABLE_VALUES:
        return getattr(settings, name, '')
    else:
        return ''

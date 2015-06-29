import re
from django import template

register = template.Library()


@register.simple_tag
def nav_active(request, pattern):
    """
    Tag to mark navigation with active tag
    :param request: WSGIRequest
    :param pattern: String
    :return: String
    """
    try:
        if re.search(pattern, request.path):
            return 'active'
        return ''
    except Exception:
        # @TODO: log exception
        return ''
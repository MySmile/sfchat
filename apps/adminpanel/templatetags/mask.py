from django import template
register = template.Library()


@register.filter(name='mask')
def mask(some_str):
    if type(some_str) != 'str':
        some_str = str(some_str)
    return str.join('******', (some_str[0], some_str[-4:]))
    # return some_str
from bson.objectid import ObjectId

from django import template
register = template.Library()


@register.filter(name='mask')
def mask(object_id):
    """ Mask ObjectId by symbol asterisk
    """
    if isinstance(object_id, ObjectId):
        object_id = str(object_id)
        return str.join('******', (object_id[0], object_id[-4:]))
    else:
        return ''
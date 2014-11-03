from bson.objectid import ObjectId
from mongoengine import *
import datetime


class Messages(EmbeddedDocument):
    token = ObjectIdField()
    msg = StringField(max_length=144)
    system = BooleanField(default=False)

class Users(EmbeddedDocument):
    token = ObjectIdField()
    messages = ListField(EmbeddedDocumentField(Messages))

class Chats(Document):
    status = StringField(max_length=8, \
                        choices = (('draft', 'draft'), \
                                   ('ready', 'ready'), \
                                   ('closed','closed')), default='draft')
    user_tokens = ListField(ObjectIdField())
    users = ListField(EmbeddedDocumentField(Users))
    created = DateTimeField(default=datetime.datetime.now)

    def clean(self):
        if len(self.user_tokens)>2:
            msg = 'Length user_tokens must be equal or less then 2.'
            raise ValidationError(msg)

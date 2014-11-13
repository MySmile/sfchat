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
    STATUS_DRAFT = 'draft'
    STATUS_READY = 'ready'
    STATUS_CLOSED = 'closed'

    status = StringField(max_length=8, \
                        choices = (('draft', 'draft'), \
                                   ('ready', 'ready'), \
                                   ('closed','closed')), default='draft')
    user_tokens = ListField(ObjectIdField())
    users = ListField(EmbeddedDocumentField(Users))
    created = DateTimeField(default=datetime.datetime.now)
    
    @staticmethod
    def create_chat():
        chat_token = ObjectId()
        user_token = ObjectId()
        msg = "Welcome to SFChat! <br /> Please send code: " + str(chat_token) + " to Talker"

        messages = Messages(token=ObjectId(), msg=msg, system=True)
        user = Users(token=user_token, messages=[messages])
        chat = Chats(id=chat_token, users=[user], user_tokens=[user_token])
        chat.save()
        return str(chat_token)
    
    @staticmethod
    def join_to_chat(chat_token):
        try:
            chat = Chats.objects.get(id=ObjectId(chat_token))
        except TypeError:
            chat = False
        except DoesNotExist:
            chat = False

        if ((not chat) or (len(chat.user_tokens) != 1)):
            return False

        user_token = ObjectId()
        msg = "Talker was successfully joined to chat"

        messages = Messages(token=ObjectId(), msg=msg, system=True)
        user = Users(token=user_token, messages=[messages])

        chat.user_tokens.append(user_token)
        chat.users.append(user)
        chat.status = Chats.STATUS_READY
        chat.save()
        return str(user_token)

    @staticmethod
    def validate_chat_token(chat_token):
        try:
            chat = Chats.objects.only('id').get(id=ObjectId(chat_token))
            result = True
        except TypeError:
            result = False
        except DoesNotExist:
            result = False

        return result

    @staticmethod
    def get_chat(chat_token, user_token):
        try:
            result = Chats.objects.get(id=ObjectId(chat_token),
                                       status__in=[Chats.STATUS_DRAFT, Chats.STATUS_READY],
                                       user_tokens=ObjectId(user_token))
        except TypeError:
            result = False
        except DoesNotExist:
            result = False

        return result

    def clean(self):
        if len(self.user_tokens)>2:
            msg = 'Length user_tokens must be equal or less then 2.'
            raise ValidationError(msg)

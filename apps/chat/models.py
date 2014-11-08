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

    def create_chat(self):
        chat_token = ObjectId()
        user_token = ObjectId()
        msg = "Welcome to SFChat! <br /> Please send code: " + str(chat_token) + " to Talker"

        messages = Messages(token=ObjectId(), msg=msg, system=True)
        user = Users(token=user_token, messages=[messages])
        chat = Chats(id=chat_token, users=[user], user_tokens=[user_token])
        chat.save()
        return str(chat_token)

    def join_to_chat(self, chat_token):
        chat = self.objects(id=ObjectId(chat_token))[0]
        if ((not chat) or (len(chat.user_tokens) != 1)):
            return False

        user_token = ObjectId()
        msg = "Talker was successfully joined to chat"

        messages = Messages(token=ObjectId(), msg=msg, system=True)
        user = Users(token=user_token, messages=[messages])
        chat.user_tokens.append(user_token)
        chat.users.append(user)
        chat.status = 'ready'
        chat.save()
        return True


    def clean(self):
        if len(self.user_tokens)>2:
            msg = 'Length user_tokens must be equal or less then 2.'
            raise ValidationError(msg)

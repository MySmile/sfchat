from bson.objectid import ObjectId
from mongoengine import *
from apps.chat.querysets import ChatsQuerySet
import datetime


class Messages(EmbeddedDocument):
    _id = ObjectIdField(required=True)
    user_token = ObjectIdField(required=True)
    msg = StringField(max_length=144, required=True)
    system = BooleanField(default=False)
    created = DateTimeField(default=datetime.datetime.utcnow())

    @staticmethod
    def prepare_message(msg, user_token, system=True):
        """
        Gets message
        :param msg: String message text
        :param system: Boolean true as default
        :param user_token: ObjectId
        :return: Messages
        """
        return Messages(_id=ObjectId(), user_token=user_token, msg=msg, system=system)


class Chats(Document):
    STATUS_DRAFT = 'draft'
    STATUS_READY = 'ready'
    STATUS_CLOSED = 'closed'
    HTTP_CODE = 200
    HTTP_MSG = 'Ok'
    # it's used for authentication
    is_staff = True

    status = StringField(max_length=8,
                         choices=((STATUS_DRAFT, STATUS_DRAFT),
                                  (STATUS_READY, STATUS_READY),
                                  (STATUS_CLOSED, STATUS_CLOSED)), default=STATUS_DRAFT)
    user_tokens = ListField(ObjectIdField())
    messages = ListField(EmbeddedDocumentField(Messages))
    created = DateTimeField(default=datetime.datetime.utcnow())

    meta = {'queryset_class': ChatsQuerySet}

    @property
    def count(self):
        return len(self.messages)

    def code(self):
        return self.HTTP_CODE

    def msg(self):
        return self.HTTP_MSG

    def clean(self):
        if len(self.user_tokens) > 2:
            msg = 'Length user_tokens must be equal or less then 2.'
            raise ValidationError(msg)

    @staticmethod
    def create_chat():
        """
        Create chat
        :return: String chat_token
        """
        chat_token = ObjectId()
        user_token = ObjectId()
        msg = "Welcome to SFChat! <br /> Please send code: " + str(chat_token) + " to Talker"
        message = Messages.prepare_message(msg=msg, user_token=user_token)
        chat = Chats(id=chat_token, messages=[message], user_tokens=[user_token])
        chat.save()
        return str(chat_token)
    
    @staticmethod
    def join_to_chat(chat_token):
        """
        Join to chat
        :param chat_token: String
        :return: Mix false or user_token if ok
        """
        try:
            chat = Chats.objects.get_all_by_token(chat_token)
        except (TypeError, DoesNotExist) as ex:
            return False

        user_token = ObjectId()
        msg = "Talker was successfully joined to chat"

        message = Messages.prepare_message(msg=msg, user_token=user_token)
        chat.user_tokens.append(user_token)
        chat.messages.append(message)
        chat.status = Chats.STATUS_READY
        chat.save()
        return str(user_token)

    @staticmethod
    def validate_chat_token(chat_token):
        """
        Validate chat token
        :param chat_token: String
        :return: Boolean
        """
        try:
            chat = Chats.objects.get_id_by_token(chat_token)
            result = True
        except (TypeError, DoesNotExist) as ex:
            result = False

        return result

    @staticmethod
    def get_chat(chat_token, user_token):
        """
        Gets data that's related to current user
        :param chat_token: String
        :param user_token: String
        :return: Boolean
        """
        try:
            result = Chats.objects.get_active(chat_token, user_token, [Chats.STATUS_DRAFT, Chats.STATUS_READY])
            result.messages = list(filter(lambda item: user_token == str(item.user_token), result.messages))
        except (TypeError, DoesNotExist) as ex:
            result = False

        return result

    # def add_message(self, user_token, messages=[]):
        """
        Add messages
        :param user_token: String
        :param messages: Array
        :return: Boolean
        """
        # messages = Messages.add_token(messages)
        # try:
        #     test = 'push_all__users__0__messages'
        #     self.update(test=messages)
        #     result = True
        # except (TypeError, ValidationError) as ex:
        #     result = False
        #
        # return result

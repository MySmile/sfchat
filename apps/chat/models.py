import datetime
from bson.objectid import ObjectId
from bson.errors import InvalidId
from mongoengine import *
from django.utils.translation import ugettext as _
from apps.chat.querysets import ChatsQuerySet
from apps.chat.errors import *

import logging
logger = logging.getLogger(__name__)


class Messages(EmbeddedDocument):
    _id = ObjectIdField(required=True)
    user_token = ObjectIdField(required=True)
    msg = StringField(min_length=1, max_length=144, required=True)
    system = BooleanField(default=False)
    created = DateTimeField(default=datetime.datetime.now())

    def clean(self):
        if isinstance(self.user_token, str):
            self.user_token = ObjectId(self.user_token)

    @staticmethod
    def prepare_message(msg, user_token, system=True):
        """
        Gets message
        :param msg: String message text
        :param system: Boolean true as default
        :param user_token: ObjectId
        :return: Messages
        """
        message = Messages(_id=ObjectId(), user_token=user_token, msg=msg, system=system)
        message.validate()
        return message


class LongPolling(EmbeddedDocument):
    _id = ObjectIdField(required=True)
    user_token = ObjectIdField(required=True)
    created = DateTimeField(default=datetime.datetime.now())

    def __bool__(self):
        return True

class Chats(Document):
    MAX_USER_TOKENS = 2
    STATUS_DRAFT = 'draft'
    STATUS_READY = 'ready'
    STATUS_CLOSED = 'closed'
    HTTP_CODE = 200
    HTTP_MSG = 'Ok'

    MSG_CREATE_CHAT = _('Welcome to SFChat! <br> Please send code: <mark>%(chat_token)s</mark> to Talker')
    MSG_JOIN_CHAT_YOU = _('Talker was successfully joined to chat')
    MSG_JOIN_CHAT_TALKER = _('Chat is ready to use')
    MSG_CHAT_CLOSE_TALKER = _('Thank you for using SFChat.<br> Chat was successfully closed by Talker.')
    MSG_CHAT_CLOSE_YOU = _('Thank you for using SFChat<br>Current chat was successfully closed.')
    MSG_CHAT_CLOSE_AUTO = _('Thank you for using SFChat<br>Current chat was successfully closed automatically.')

    # it's used for authentication
    is_staff = True

    status = StringField(max_length=8,
                         choices=((STATUS_DRAFT, STATUS_DRAFT),
                                  (STATUS_READY, STATUS_READY),
                                  (STATUS_CLOSED, STATUS_CLOSED)), default=STATUS_DRAFT)
    user_tokens = ListField(ObjectIdField())
    messages = ListField(EmbeddedDocumentField(Messages))
    long_polling = ListField(EmbeddedDocumentField(LongPolling))
    created = DateTimeField(default=datetime.datetime.now())

    meta = {
        'queryset_class': ChatsQuerySet,
        'db_alias': 'sfchat',
    }

    def clean(self):
        if len(self.user_tokens) > self.MAX_USER_TOKENS:
            msg = 'Length user_tokens must be equal or less then ' + str(self.MAX_USER_TOKENS)
            raise ValidationError(msg)

    @property
    def count(self):
        """
        Number of messages
        :return: String
        """
        return len(self.messages)

    def code(self):
        return self.HTTP_CODE

    def msg(self):
        return self.HTTP_MSG

    @staticmethod
    def create_chat():
        """
        Create chat
        :return: Dictionary {'chat_token': '', 'user_token': ''}
        """
        chat_token = ObjectId()
        user_token = ObjectId()
        msg = Chats.MSG_CREATE_CHAT % {'chat_token': str(chat_token)}
        message = Messages.prepare_message(msg=msg, user_token=user_token)
        chat = Chats(id=chat_token, messages=[message], user_tokens=[user_token])
        chat.save()
        return {'chat_token': str(chat_token), 'user_token': str(user_token)}

    @staticmethod
    def join_to_chat(chat_token):
        """
        Join to chat
        :param chat_token: String
        :return: Mix false or user_token if ok
        """
        try:
            chat = Chats.objects.get_all_by_token(chat_token)
        except (TypeError, InvalidId, DoesNotExist) as ex:
            # @TODO logging this error
            return False

        if len(chat.user_tokens) != 1:
            return False

        user_token = ObjectId()
        prepared_messages = [
            Messages.prepare_message(msg=Chats.MSG_JOIN_CHAT_TALKER, user_token=user_token),
            Messages.prepare_message(msg=Chats.MSG_JOIN_CHAT_YOU, user_token=chat.user_tokens[0])
        ]
        chat.update(set__status=Chats.STATUS_READY, push__user_tokens=user_token, push_all__messages=prepared_messages)
        return str(user_token)

    @staticmethod
    def validate_chat_token(chat_token):
        """
        Validate chat token
        :param chat_token: String
        :return: Boolean
        """
        try:
            Chats.objects.get_id_by_token(chat_token)
            result = True
        except (TypeError, InvalidId, DoesNotExist) as ex:
            # @TODO logging this error
            result = False
        return result

    @staticmethod
    def get_chat(chat_token, user_token):
        """
        Gets data that's related to current user
        :param chat_token: String
        :param user_token: String
        :return: Chat
        """
        try:
            result = Chats.objects.get_chat(chat_token, user_token)
            result.messages = list(filter(lambda item: user_token == str(item.user_token), result.messages))
        except (TypeError, InvalidId, DoesNotExist) as ex:
            logger.error(ex)
            raise ChatDoesNotExist

        return result

    @staticmethod
    def delete_closed_chat():
        """
        Delete closed chats
        :return: String
        """
        chats = Chats.objects(status='closed')
        result = str(len(chats))
        chats.delete()

        return result


    @staticmethod
    def get_all_chat():
        """
        Gets all chats list
        :return: List
        """
        result = Chats.objects.all().values_list('id',  'created', 'status').order_by('-status','-created', )

        return result;

    def add_message(self, user_token, messages=None, system=False):
        """
        Add messages
        :param user_token: String
        :param messages: Array
        :param system: Boolean
        :return: Boolean
        """
        messages = messages or []
        talker_token = self.get_talker_token(user_token)
        if not talker_token:
            return False

        try:
            prepared_messages = []
            for item in messages:
                prepared_messages.append(Messages.prepare_message(msg=item['msg'], user_token=talker_token, system=system))

            self.update(push_all__messages=prepared_messages)
            result = True
        except (TypeError, InvalidId, ValidationError) as ex:
            # @TODO logging this error
            result = False

        return result

    def delete_message(self, messages):
        """
         Delete messages
         :param messages: Array
         :return: Boolean
        """
        try:
            for item in messages:
                # pull_all supports only a single field depth
                self.update(pull__messages___id=item['_id'])
            result = True
        except (TypeError, InvalidId, ValidationError) as ex:
            # @TODO logging this error
            result = False

        return result

    def close_chat(self, user_token):
        """
         User init close chat
         :param user_token: ObjectId
         :return: Boolean
        """
        try:
            prepared_messages = [
                Messages.prepare_message(msg=self.MSG_CHAT_CLOSE_YOU, user_token=user_token)
            ]
            # it's possible to close "draft" chat
            talker_token = self.get_talker_token(user_token)
            if talker_token:
                prepared_messages.append(
                    Messages.prepare_message(msg=self.MSG_CHAT_CLOSE_TALKER, user_token=talker_token)
                )

            self.update(set__status=self.STATUS_CLOSED, push_all__messages=prepared_messages)
            result = True
        except (TypeError, InvalidId, ValidationError) as ex:
            # @TODO logging this error
            result = False

        return result

    def pre_delete(self):
        """
         Automatically close chat
         :return: Boolean
         """
        try:
            prepared_messages = []
            for user_token in self.user_tokens:
                prepared_messages.append(
                    Messages.prepare_message(msg=self.MSG_CHAT_CLOSE_AUTO, \
                                                 user_token=user_token))
            self.update(set__status=self.STATUS_CLOSED, push_all__messages=prepared_messages)
            result = True
        except (TypeError, InvalidId, ValidationError) as ex:
            # @TODO logging this error
            result = False

        mask_chat_token = str.join('******', (str(self.id)[0], str(self.id)[-4:]))
        msg = 'Attempt autoclose chat with token ' + mask_chat_token + ': ' + str(result)
        logger.info(msg)
        return result

    def create_long_polling(self, user_token):
        """
        Create new long polling process and terminate all older one
        :param user_token: String
        :return: String|False process identifier, false if failed
        """
        try:
            # delete all processes
            self.delete_long_polling(user_token)

            long_polling = LongPolling(_id=ObjectId(), user_token=user_token,
                                       created=datetime.datetime.now())
            self.update(push__long_polling=long_polling)
        except (TypeError, InvalidId, DoesNotExist) as ex:
            # @TODO logging this error
            return False

        return str(long_polling._id)

    def delete_long_polling(self, user_token):
        """
        Delete all processes linked to user_token
        :param user_token:
        """
        self.update(pull__long_polling__user_token=user_token)

    def get_long_polling(self, user_token):
        """
        Gets actual process
        :param user_token: String
        :return: LongPolling|False
        """
        long_polling = list(filter(lambda item: user_token == str(item.user_token), self.long_polling))
        if not long_polling:
            return False

        return long_polling[0]

    def auto_close_long_polling(self, user_token, auto_close):
        """
        close automatically chat if talker close browser or tab
        :param user_token: String
        :param auto_close: String
        """
        talker_token = str(self.get_talker_token(user_token))
        long_polling = self.get_long_polling(talker_token)
        if long_polling and self.status == self.STATUS_READY \
                and (datetime.datetime.now() - long_polling.created).seconds > auto_close:
            self.close_chat(talker_token)

    def get_talker_token(self, user_token):
        """
        Gets talker token
        :param user_token: String
        :return: ObjectId|False talker token or false if failed or such token does nit exist
        """
        talker_token = list(filter(lambda item: user_token != str(item), self.user_tokens))
        if not talker_token:
            return False

        return talker_token[0]

    def __setattr__(self, name, value):
        if name in ('MAX_USER_TOKENS',
                    'STATUS_DRAFT',
                    'STATUS_READY',
                    'STATUS_CLOSED',
                    'HTTP_CODE',
                    'HTTP_MSG',
                    'MSG_CREATE_CHAT',
                    'MSG_JOIN_CHAT_YOU',
                    'MSG_JOIN_CHAT_TALKER',
                    'MSG_CHAT_CLOSE_TALKER',
                    'MSG_CHAT_CLOSE_YOU'):
            raise AttributeError("Can't modify data!")
        else:
            super(Chats, self).__setattr__(name, value)

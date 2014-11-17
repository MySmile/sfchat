import unittest
from bson.objectid import ObjectId
from apps.chat.models import *
from mongoengine import *


class ChatsTestCase(unittest.TestCase):
    def test_create_chat(self):
        chat_token = Chats.create_chat()
        chat = Chats.objects.get_all_by_token(chat_token)
        self.assertTrue(chat)
        return chat_token

    def test_join_to_chat_success(self):
        tokens = self.get_tokens();
        chat = Chats.objects.get_all_by_token(tokens['chat_token'])

        self.assertEquals(24, len(tokens['user_token']))
        self.assertEquals(2, len(chat.user_tokens))

    def test_join_to_chat_failed(self):
        actual = Chats.join_to_chat('543e33a2e3ce324d374246fc')
        self.assertFalse(actual)

    def test_validate_chat_token_success(self):
        chat_token = Chats.create_chat()
        actual = Chats.validate_chat_token(chat_token)
        self.assertTrue(actual)

    def test_validate_chat_token_failed(self):
        actual = Chats.validate_chat_token('543e33a2e3ce324d374246fc')
        self.assertFalse(actual)

    def test_get_chat_success(self):
        tokens = self.get_tokens()

        chat = Chats.get_chat(tokens['chat_token'], tokens['user_token'])
        self.assertEquals(tokens['chat_token'], str(chat.id))

    def test_get_chat_failed(self):
        chat = Chats.get_chat('543e33a2e3ce324d374246fc', '543e33a2e3ce324d374246fc')
        self.assertFalse(chat)

    # def test_add_message_success(self):
    #     tokens = self.get_tokens()
    #     chat = Chats.objects.get_all_by_token(tokens['chat_token'])
    #
    #     messages = [{'msg': 'First message'}, {'msg': 'Second message'}]
    #     result = chat.add_message(user_token=tokens['user_token'], messages=messages)
    #     self.assertTrue(result)

    # @TODO find out about dependencies and dataProviders
    def get_tokens(self):
        chat_token = Chats.create_chat()
        user_token = Chats.join_to_chat(chat_token)

        return {'chat_token': chat_token, 'user_token': user_token}


class MessagesTestCase(unittest.TestCase):
    def test_prepare_message(self):
        msg = {'msg': 'First message'}
        actual = Messages.prepare_message(msg=msg, user_token=ObjectId())
        self.assertEquals(24, len(str(actual._id)))
        self.assertEquals(24, len(str(actual.user_token)))
        self.assertTrue(actual.system)
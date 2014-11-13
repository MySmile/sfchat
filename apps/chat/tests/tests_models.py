import unittest
from bson.objectid import ObjectId
from apps.chat.models import *
from mongoengine import *


class ChatsTestCase(unittest.TestCase):
    def test_create_chat(self):
        chat_token = Chats.create_chat()
        chat = Chats.objects(id=ObjectId(chat_token))[0]
        self.assertTrue(chat)
        return chat_token

    def test_join_to_chat_success(self):
        tokens = self.get_tokens();
        chat = Chats.objects(id=ObjectId(tokens['chat_token']))[0]

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

    # @TODO find out about dependencies and dataProviders
    def get_tokens(self):
        chat_token = Chats.create_chat()
        user_token = Chats.join_to_chat(chat_token)

        return {'chat_token': chat_token, 'user_token': user_token}
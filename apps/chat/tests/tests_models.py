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

    # @TODO find out about dependencies and dataProviders to avoid run tests inside tests
    def test_join_to_chat_success(self):
        chat_token = Chats.create_chat()
        actual = Chats.join_to_chat(chat_token)
        self.assertTrue(actual)

    def test_join_to_chat_failed(self):
        actual = Chats.join_to_chat('543e33a2e3ce324d374246fc')
        self.assertFalse(actual)

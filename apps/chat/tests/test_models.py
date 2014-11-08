import unittest
from bson.objectid import ObjectId
from apps.chat.models import *
from mongoengine import *


class ChatsTestCase(unittest.TestCase):
    def test_create_chat(self):
        chat_token = Chats.create_chat(Chats);
        chat = Chats.objects(id=ObjectId(chat_token))[0]
        self.assertTrue(chat)

    def test_join_to_chat_success(self):
        # @TODO
        pass

    def test_join_to_chat_failed(self):
        # @TODO
        # with self.assertRaises(SomeException) as cm:
        #    do_something()
        pass
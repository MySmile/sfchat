import unittest
from apps.api.serializers import ChatMessagesSerializer
from apps.chat.models import Chats
from bson.objectid import ObjectId


class ChatMessagesTestCase(unittest.TestCase):
    def test_serialize(self):
        chat_token = Chats.create_chat()
        chat = Chats.objects.get(id=ObjectId(chat_token))

        serializer = ChatMessagesSerializer(chat)
        messages = serializer.data

        self.assertEquals(Chats.STATUS_DRAFT, messages['result']['status'])
        self.assertEquals(1, messages['result']['count'])
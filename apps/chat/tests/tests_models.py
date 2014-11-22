import unittest
from bson.objectid import ObjectId
from apps.chat.models import *
from mongoengine import *


class ChatsTestCase(unittest.TestCase):
    def setUp(self):
        self.chat_token = Chats.create_chat()['chat_token']
        self.user_token = Chats.join_to_chat(self.chat_token)

    def test_create_chat(self):
        chat = Chats.objects.get_all_by_token(self.chat_token)
        self.assertTrue(chat)

    def test_join_to_chat_success(self):
        chat = Chats.objects.get_all_by_token(self.chat_token)

        self.assertEquals(24, len(str(chat.user_tokens[1])))
        self.assertEquals(2, len(chat.user_tokens))

    def test_join_to_chat_failed(self):
        actual = Chats.join_to_chat('543e33a2e3ce324d374246fc')
        self.assertFalse(actual)

    def test_validate_chat_token_success(self):
        tokens = Chats.create_chat()
        actual = Chats.validate_chat_token(tokens['chat_token'])
        self.assertTrue(actual)

    def test_validate_chat_token_failed(self):
        actual = Chats.validate_chat_token('543e33a2e3ce324d374246fc')
        self.assertFalse(actual)

    def test_get_chat_success(self):
        chat = Chats.get_chat(self.chat_token, self.user_token)
        self.assertEquals(self.chat_token, str(chat.id))

    def test_get_chat_failed(self):
        chat = Chats.get_chat('543e33a2e3ce324d374246fc', '543e33a2e3ce324d374246fc')
        self.assertFalse(chat)

    def test_add_message_success(self):
        chat = Chats.objects.get_all_by_token(self.chat_token)
        messages = [{'msg': 'First message'}, {'msg': 'Second message'}]
        result = chat.add_message(user_token=self.user_token, messages=messages)
        self.assertTrue(result)

    def test_add_message_failed(self):
        chat = Chats.objects.get_all_by_token(self.chat_token)

        messages = [{'msg': 'Lorem ipsum dolor sit amet, abhorreant appellantur ex vis. Ad eos dicam quaeque. \
                            Sed ferri tamquam te, scaevola ocurreret conclusionemque in pro. Lorem ipsum dolor \
                            sit amet, abhorreant appellantur ex vis. Ad eos dicam quaeque. Sed ferri tamquam te, \
                            scaevola ocurreret conclusionemque in pro.'}]
        result = chat.add_message(user_token=self.user_token, messages=messages)
        self.assertFalse(result)

    def test_delete_message_success(self):
        chat = Chats.objects.get_all_by_token(self.chat_token)
        messages = [{'_id': str(chat.messages[0]._id)}]
        result = chat.delete_message(messages)
        self.assertTrue(result)

    def test_delete_message_failed(self):
        chat = Chats.objects.get_all_by_token(self.chat_token)
        messages = [{'_id': '0'*10}]
        result = chat.delete_message(messages)
        self.assertFalse(result)

    def test_delete_chat_success(self):
        chat = Chats.objects.get_all_by_token(self.chat_token)
        result = chat.delete_chat(self.user_token)
        self.assertTrue(result)

    def test_delete_chat_failed(self):
        chat = Chats.objects.get_all_by_token(self.chat_token)
        result = chat.delete_chat(ObjectId('0'*24))
        self.assertFalse(result)


class MessagesTestCase(unittest.TestCase):
    def test_prepare_message_success(self):
        # msg = {'msg': 'First message'}
        msg = 'First message'
        actual = Messages.prepare_message(user_token=ObjectId(), msg=msg)
        self.assertEquals(24, len(str(actual._id)))
        self.assertEquals(24, len(str(actual.user_token)))
        self.assertTrue(actual.system)

    def test_prepare_message_failed(self):
        msg = 'Lorem ipsum dolor sit amet, abhorreant appellantur ex vis. Ad eos dicam quaeque. \
                    Sed ferri tamquam te, scaevola ocurreret conclusionemque in pro. Lorem ipsum dolor \
                    sit amet, abhorreant appellantur ex vis. Ad eos dicam quaeque. Sed ferri tamquam te, \
                    scaevola ocurreret conclusionemque in pro.'

        lambda_validate = lambda msg: Messages.prepare_message(msg=msg, user_token=ObjectId())
        self.assertRaises(ValidationError, lambda_validate, msg)
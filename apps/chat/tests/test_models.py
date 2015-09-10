import time
import unittest
from bson.objectid import ObjectId
from apps.chat.models import *
from mongoengine import *
from apps.chat.errors import *


class ChatsTestCase(unittest.TestCase):
    def setUp(self):
        self.chat_token = Chats.create_chat()['chat_token']
        self.user_token = Chats.join_to_chat(self.chat_token)
        self.chat = Chats.objects.get_all_by_token(self.chat_token)

    def test_create_chat(self):
        self.assertTrue(self.chat)

    def test_join_to_chat_success(self):
        self.assertEquals(24, len(str(self.chat.user_tokens[1])))
        self.assertEquals(2, len(self.chat.user_tokens))

    def test_join_to_chat_failed(self):
        actual = Chats.join_to_chat('111111111111111111111111')
        self.assertFalse(actual)

    def test_join_to_chat_twice_failed(self):
        actual = Chats.join_to_chat(str(self.chat_token))
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
        try:
            Chats.get_chat('543e33a2e3ce324d374246fc', '543e33a2e3ce324d374246fc')
        except Exception as ex:
            self.assertIsInstance(ex, ChatDoesNotExist)

    def test_add_message_success(self):
        messages = [{'msg': 'First message'}, {'msg': 'Second message'}]
        result = self.chat.add_message(user_token=self.user_token, messages=messages)
        self.assertTrue(result)

    def test_add_message_failed(self):
        messages = [{'msg': 'Lorem ipsum dolor sit amet, abhorreant appellantur ex vis. Ad eos dicam quaeque. \
                            Sed ferri tamquam te, scaevola ocurreret conclusionemque in pro. Lorem ipsum dolor \
                            sit amet, abhorreant appellantur ex vis. Ad eos dicam quaeque. Sed ferri tamquam te, \
                            scaevola ocurreret conclusionemque in pro.'}]
        result = self.chat.add_message(user_token=self.user_token, messages=messages)
        self.assertFalse(result)

    def test_delete_message_success(self):
        messages = [{'_id': str(self.chat.messages[0]._id)}]
        result = self.chat.delete_message(messages)
        self.assertTrue(result)

    def test_delete_message_failed(self):
        messages = [{'_id': '0' * 10}]
        result = self.chat.delete_message(messages)
        self.assertFalse(result)

    def test_close_chat_success(self):
        result = self.chat.close_chat(self.user_token)
        self.assertTrue(result)

    def test_pre_delete(self):
        result = self.chat.pre_delete()
        self.assertTrue(result)

    def test_delete_closed_chat(self):
        chat_token = Chats.create_chat()['chat_token']
        chat = Chats.objects.get_all_by_token(chat_token)
        chat.status = 'closed'
        chat.save()
        id = chat.id
        chat.delete_closed_chat()
        chat = Chats.objects.filter(id=id)
        self.assertEquals([], list(chat))

    def test_create_long_polling(self):
        expected = self.chat.create_long_polling(self.user_token)
        self.chat.reload()
        actual = self.chat.long_polling[0]._id
        self.assertEquals(expected, str(actual))

    def test_get_long_polling_success(self):
        self.chat.create_long_polling(self.user_token)
        self.chat.reload()
        long_polling = self.chat.get_long_polling(self.user_token)
        self.assertEquals(24, len(str(long_polling._id)))

    def test_get_long_polling_failed(self):
        self.chat.create_long_polling(self.user_token)
        self.chat.reload()
        long_polling = self.chat.get_long_polling(self.chat_token)
        self.assertFalse(long_polling)

    def test_auto_close_long_polling(self):
        talker_token = self.chat.get_talker_token(self.user_token)
        self.chat.create_long_polling(self.user_token)
        self.chat.create_long_polling(talker_token)
        self.chat.reload()

        time.sleep(2)
        self.chat.auto_close_long_polling(self.user_token, 1)
        self.chat.reload()
        self.assertEquals(Chats.STATUS_CLOSED, self.chat.status)

    def test_count_is_int(self):
        count = self.chat.count
        self.assertTrue(isinstance(count, int))
        self.assertEquals(count, 3)

    def test_consts(self):
        max_user_tokens = self.chat.MAX_USER_TOKENS
        self.assertEquals(max_user_tokens, 2)
        try:
            self.chat.MAX_USER_TOKENS = 100
        except AttributeError as err:
            self.assertEquals(err.__str__(), "Can't modify data!")


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

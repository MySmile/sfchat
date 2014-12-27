from bson.objectid import ObjectId
from mongoengine import QuerySet


class ChatsQuerySet(QuerySet):
    def get_id_by_token(self, chat_token):
        return self.only('id').get(id=ObjectId(chat_token))

    def get_all_by_token(self, chat_token):
        return self.get(id=ObjectId(chat_token))

    def get_active(self, chat_token, user_token, status=None):
        status = status or []
        return self.get(id=ObjectId(chat_token),
                        status__in=status,
                        user_tokens=ObjectId(user_token))

    def get_chat(self, chat_token, user_token):
        return self.get(id=ObjectId(chat_token), user_tokens=ObjectId(user_token))
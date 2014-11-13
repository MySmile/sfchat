from rest_framework.serializers import ModelSerializer

from apps.chat.models import Chats


class ChatsSerializer(ModelSerializer):
    class Meta:
        model = Chats
        fields = ('id', 'status', 'user_tokens', 'users', 'created')

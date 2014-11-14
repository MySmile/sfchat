from rest_framework import serializers


class MessagesSerializer(serializers.Serializer):
    token = serializers.CharField(max_length=24)
    msg = serializers.CharField(max_length=144)
    system = serializers.BooleanField()


class ChatMessagesSerializer(serializers.Serializer):
    """
    Serialized messages related to current user
    """
    code = 200
    msg = 'Ok'

    def to_native(self, obj):
        messages = MessagesSerializer(obj.users[0].messages, many=True).data if obj.users else []

        return {'result': {'code': self.code, 'msg': self.msg, 'status': obj.status, 'count': len(messages),
                           'messages': messages}}

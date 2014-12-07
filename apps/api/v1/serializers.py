from rest_framework import serializers


class MessagesSerializer(serializers.Serializer):
    _id = serializers.CharField(max_length=24)
    msg = serializers.CharField(max_length=144)
    system = serializers.BooleanField()
    created = serializers.DateTimeField()


class ChatMessagesSerializer(serializers.Serializer):
    code = serializers.IntegerField()
    msg = serializers.CharField()
    count = serializers.IntegerField()
    status = serializers.BooleanField()
    messages = MessagesSerializer(many=True)

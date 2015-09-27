import pytz
from django.conf import settings
from rest_framework import serializers


class DateTimeTzSerializer(serializers.Serializer):
    def to_native(self, value):
        localize = pytz.timezone(settings.TIME_ZONE).localize(value)
        return str(localize)


class MessagesSerializer(serializers.Serializer):
    _id = serializers.CharField(max_length=24)
    msg = serializers.CharField(max_length=144)
    system = serializers.BooleanField()


class ChatMessagesSerializer(serializers.Serializer):
    code = serializers.IntegerField()
    msg = serializers.CharField()
    count = serializers.IntegerField()
    status = serializers.CharField()
    messages = MessagesSerializer(many=True)

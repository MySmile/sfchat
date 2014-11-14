from apps.chat.models import Chats
from apps.chat.models import Messages
from apps.chat.models import Users
from apps.api.serializers import ChatMessagesSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.api.authentication import TokenAuthentication


class Messages(APIView):
    def get(self, request, format=None):
        """
        List all messages related to current user
        """
        serializer = ChatMessagesSerializer(request.user)
        return Response(serializer.data)
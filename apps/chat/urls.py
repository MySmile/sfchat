from django.conf.urls import url
from apps.chat.views import chat

urlpatterns = [
    url(r'^chat/(?P<chat_token>[a-z0-9]{24})$', chat, name='chat'),
]

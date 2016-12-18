from django.conf.urls import url

from apps.adminpanel.views import ManagerChatsView, ClearChatsView


urlpatterns = [
    url(r'^admin/chat-manager/$', ManagerChatsView.as_view(), name='chat-manager'),
    url(r'^admin/clear-chats/$', ClearChatsView.as_view()),
]

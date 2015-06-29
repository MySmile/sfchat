from django.conf.urls import patterns, url

from apps.adminpanel.views import ManagerChatsView, ClearChatsView


urlpatterns = patterns('',
                       url(r'^admin/chat-manager/$', ManagerChatsView.as_view()),
                       url(r'^admin/clear-chats/$', ClearChatsView.as_view()),

                       )

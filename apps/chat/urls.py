from django.conf.urls import patterns, url

from apps.chat.views import SFChatChatView

urlpatterns = patterns('',
    url(r'^creatchat$', CreateChatView.as_view()),
    url(r'^chat$', ChatView.as_view(), name='chat'),
    #~ url(r'^chat/(?P<[a-z,0-9]{24}>)$', SFChatChatView.as_view(template_name='chat.html'), name='home'),
)

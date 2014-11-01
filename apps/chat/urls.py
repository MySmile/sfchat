from django.conf.urls import patterns, url


urlpatterns = patterns('apps.chat.views',
    url(r'^creat_chat$', 'creat_chat'),
    url(r'^join_chat$', 'join_chat'),
    #~ url(r'^chat/(?P<[a-z,0-9]{24}>)$', SFChatChatView.as_view(template_name='chat.html'), name='home'),
)

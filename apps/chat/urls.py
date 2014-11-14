from django.conf.urls import patterns, url


urlpatterns = patterns('apps.chat.views',
    # url(r'^close$', 'close_chat'),
    url(r'^chat/(?P<chat_token>[a-z0-9]{24})$', 'chat'),
)

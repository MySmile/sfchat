from django.conf.urls import patterns, url

from apps.home.views import SFChatHomeView


urlpatterns = patterns('',
    url(r'^$', SFChatHomeView.as_view(template_name='home.html'), name='home'),
)

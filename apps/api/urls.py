from django.conf.urls import patterns, url, include
from django.views.decorators.csrf import csrf_exempt

from apps.api.views import SFChatApiView


urlpatterns = patterns('',
    url(r'^api-auth/$', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^messages$', csrf_exempt(SFChatApiView.as_view())),
)

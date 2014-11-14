from django.conf.urls import patterns, url
from rest_framework.urlpatterns import format_suffix_patterns
from apps.api.views import *

urlpatterns = [
    url(r'^api/messages$', Messages.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
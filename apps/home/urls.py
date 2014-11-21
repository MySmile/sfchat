from django.conf.urls import patterns, url

from apps.home.views import HomeView, CreateView

urlpatterns = patterns('',
    url(r'^$', HomeView.as_view()),
    url(r'^create-chat/$', CreateView.as_view()),
)

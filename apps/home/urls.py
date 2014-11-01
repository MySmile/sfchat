from django.conf.urls import patterns, url

from apps.home.views import HomeView

urlpatterns = patterns('',
    url(r'^$', HomeView.as_view()),
)

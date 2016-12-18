from django.conf.urls import url

from apps.home.views import HomeView, CreateView

urlpatterns = [
    url(r'^$', HomeView.as_view()),
    url(r'^create-chat/$', CreateView.as_view()),
]

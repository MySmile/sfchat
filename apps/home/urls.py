
from django.conf.urls import patterns, url

from apps.home.views import HomeView


urlpatterns = patterns('',
    url(r'^$', HomeView.as_view(template_name='home.html'), name='home'),
)

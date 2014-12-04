from django.conf.urls import patterns, url

from apps.home.views import HomeView, CreateView

urlpatterns = patterns('apps.content_security_policy.views',
    url(r'^csp-report/$', 'csp_report'),
)

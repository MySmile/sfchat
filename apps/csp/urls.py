from django.conf.urls import patterns, url

from apps.csp.views import CSPReport

urlpatterns = patterns('',
    url(r'^csp-report/$', CSPReport.as_view()),
)

from django.conf.urls import url

from apps.csp.views import CSPReport

urlpatterns = [
    url(r'^csp-report/$', CSPReport.as_view()),
]

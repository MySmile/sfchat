from django.conf.urls import patterns, url

from apps.adminpanel.views import ManagerChatsView


urlpatterns = patterns('',
                       url(r'^admin/manager-chats/$', ManagerChatsView.as_view()),
                       )

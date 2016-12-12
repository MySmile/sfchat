# from django.conf.urls import *
# from rest_framework.routers import DefaultRouter
#
# from apps.api.v1.views import MessagesView
#
# router = DefaultRouter()
# router.register('messages', MessagesView)
# urlpatterns = router.urls



from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from apps.api.v1.views import MessagesView, ChatView


urlpatterns = [
    url(r'messages$', MessagesView.as_view()),
    url(r'chat$', ChatView.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)

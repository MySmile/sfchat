from django.conf.urls import *
from rest_framework.routers import DefaultRouter

from apps.api.v1.views import Messages


#router = DefaultRouter()
#router.register('v1', Messages.as_view())
#urlpatterns = router.urls


urlpatterns = patterns('',
    #url(r'', include(v0_api_urlpatterns)),  # Un-versioned. 
    url(r'v1/', include('apps.api.v1.urls', namespace='v1')),
    #url(r'v2/', include(v2_api_urlpatterns, namespace='v2')),
)

#from django.conf.urls import patterns, url
#from rest_framework.urlpatterns import format_suffix_patterns
#from apps.api.views import *

#urlpatterns = [
    #url(r'^api/messages$', Messages.as_view()),
#]

#urlpatterns = format_suffix_patterns(urlpatterns)
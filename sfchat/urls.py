from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf.urls.i18n import i18n_patterns
from django.contrib.staticfiles.views import serve as serve_static
from django.views.decorators.cache import never_cache

from sfchat.settings.base import LANGUAGES
from sfchat.settings.local import DEBUG # fix me


#~ urlpatterns = i18n_patterns('',
urlpatterns = patterns('',

    #~ url(r'^admin/', include(admin.site.urls)),
    
    url('', include('apps.api.urls')),
    url('', include('apps.chat.urls')),
    url('', include('apps.flatpages.urls')),
    url('', include('apps.home.urls')),
)

handler404 = 'apps.home.views.e404'
handler500 = 'apps.home.views.e500'


if DEBUG:
    urlpatterns += patterns('django.views.static',
        #~ (r'media/(?P<path>.*)', 'serve', {'document_root': MEDIA_ROOT}),
        url(r'^static/(?P<path>.*)$', never_cache(serve_static)),
    )

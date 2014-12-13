from django.conf.urls import patterns, include, url
from django.contrib.staticfiles.views import serve as serve_static
from django.views.decorators.cache import never_cache
from django.conf import settings


urlpatterns = patterns('',
                       url(r'^api/', include('apps.api.urls', namespace='api')),
                       url('', include('apps.chat.urls')),
                       url('', include('apps.csp.urls')),
                       url('', include('apps.flatpages.urls')),
                       url('', include('apps.home.urls')),
                       url('', include('apps.sitemap.urls')),
                       )

handler404 = 'apps.home.views.e404'
handler500 = 'apps.home.views.e500'

if settings.DEBUG:
    urlpatterns += patterns('django.views.static',
                            url(r'^static/(?P<path>.*)$', never_cache(serve_static)),
    )


if settings.DEBUG:
    import debug_toolbar
    urlpatterns += patterns('',
        url(r'^__debug__/', include(debug_toolbar.urls)),
    )
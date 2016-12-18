from django.conf.urls import include, url
from django.contrib.staticfiles.views import serve as serve_static
from django.views.decorators.cache import never_cache
from django.conf import settings
from django.contrib import admin


urlpatterns = [
    url(r'^api/', include('apps.api.urls', namespace='api')),
    url('', include('apps.chat.urls')),
    url('', include('apps.csp.urls')),
    url('', include('apps.flatpages.urls')),
    url('', include('apps.home.urls')),
    url('', include('apps.sitemap.urls')),
    url('', include('apps.adminpanel.urls')),

    url(r'^admin/', include(admin.site.urls)),
]

handler404 = 'apps.home.utils.e404'
handler500 = 'apps.home.utils.e500'

admin.site.site_header = 'SFChat administration'
admin.site.site_title = 'SFChat admin'
admin.site.index_title = 'SFChat'

if settings.DEBUG:
    urlpatterns += [
        url(r'^static/(?P<path>.*)$', never_cache(serve_static)),
    ]


if settings.DEBUG:
    import debug_toolbar
    urlpatterns += [
        url(r'^__debug__/', include(debug_toolbar.urls)),
    ]

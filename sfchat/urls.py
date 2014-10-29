from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf.urls.i18n import i18n_patterns
from django.contrib.staticfiles.views import serve as serve_static
from django.views.decorators.cache import never_cache

from sfchat.settings import LANGUAGES

urlpatterns = patterns('',
    (r'^i18n/', include('django.conf.urls.i18n')),
)

urlpatterns += i18n_patterns('',
    # Examples:
    # url(r'^$', 'sfchat.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    
    url('', include('apps.api.urls')),
    url('', include('apps.chat.urls')),
    url('', include('apps.flatpages.urls')),
    url('', include('apps.home.urls')),

)


from sfchat.settings import DEBUG#, MEDIA_ROOT
if DEBUG:
    urlpatterns += patterns('django.views.static',
        #~ (r'media/(?P<path>.*)', 'serve', {'document_root': MEDIA_ROOT}),
        url(r'^static/(?P<path>.*)$', never_cache(serve_static)),
    )

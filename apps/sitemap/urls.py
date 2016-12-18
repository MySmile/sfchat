from django.conf.urls import url
from django.http import HttpResponse
from django.conf import settings
from apps.sitemap.views import SitemapXML


urlpatterns = [
    url(r'^sitemap\.xml$', SitemapXML),

    #(r'^robots\.txt$', lambda r: HttpResponse("User-agent: *\nDisallow: /", mimetype="text/plain")),
    url(r'^robots\.txt$', lambda r: HttpResponse("User-agent: *\nHost: " + \
                                              settings.ALLOWED_HOSTS[0] +
                                              "\nSitemap: //" + settings.ALLOWED_HOSTS[0] + \
                                              "/sitemap.xml", content_type="text/plain")),
]

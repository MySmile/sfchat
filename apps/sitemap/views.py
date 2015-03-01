from django.http import HttpResponse


def createNode(url):
    return '<url><loc>' + url + '</loc><changefreq>yearly</changefreq></url>'

def SitemapXML(request):
    xml = '<?xml version = "1.0" encoding = "UTF-8"?>\
    <urlset xmlns = "http://www.sitemaps.org/schemas/sitemap/0.9">\
          <url><loc>' + 'http://' + request.META['HTTP_HOST'] + '</loc><changefreq>yearly</changefreq></url>'
    for item in ['privacy', 'faq', 'license']:
        url = 'http://' + request.META['HTTP_HOST'] + '/' + item + '.html'
        xml += createNode(url)
    xml += '</urlset>'
    return HttpResponse(xml, content_type="text/xml")

from django.conf.urls import patterns, url

from apps.flatpages.views import SFChatFlatpagesView


urlpatterns = patterns('',
    url(r'^privacy$', SFChatFlatpagesView.as_view(template_name='privacy.html'), name='privacy'),
    url(r'^license$', SFChatFlatpagesView.as_view(template_name='license.html'), name='license'),
    url(r'^sources$', SFChatFlatpagesView.as_view(template_name='sources.html'), name='sources'),
    url(r'^faq$', SFChatFlatpagesView.as_view(template_name='faq.html'), name='faq'),
)

from django.http import HttpResponseNotFound 
from django.template import RequestContext, loader, Template, TemplateDoesNotExist
from django.views.generic.base import TemplateView
#logger = logging.getLogger(__name__)  # Get an instance of a logger


class SFChatFlatpagesView(TemplateView):
    template_name = ''
    def get_context_data(self, **kwargs):
        context = super(SFChatFlatpagesView, self).get_context_data(**kwargs)
        return context


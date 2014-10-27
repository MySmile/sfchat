from django.http import HttpResponseNotFound 
from django.template import RequestContext, loader, Template, TemplateDoesNotExist
from django.views.generic.base import TemplateView
#logger = logging.getLogger(__name__)  # Get an instance of a logger


class SFChatFlatpagesView(TemplateView):
    def get_context_data(self, **kwargs):
        context = super(SFChatFlatpagesView, self).get_context_data(**kwargs)
        return context

    def dispatch(self, request, *args, **kwargs):
        self.template_name = str.join('.',(self.kwargs['template_name'],'html'))
        return super(SFChatFlatpagesView, self).dispatch(request, *args, **kwargs)

from django.http import HttpResponseNotFound 
from django.template import RequestContext, loader, Template, TemplateDoesNotExist
from django.views.generic.base import TemplateView
#logger = logging.getLogger(__name__)  # Get an instance of a logger

from apps.home.forms import CreateChatForm

class HomeView(TemplateView):
    def get_context_data(self, **kwargs):
        context = super(HomeView, self).get_context_data(**kwargs)
        context['form'] = CreateChatForm()
        return context


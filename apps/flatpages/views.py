from django.views.generic.base import TemplateView
#logger = logging.getLogger(__name__)  # Get an instance of a logger


class FlatpagesView(TemplateView):
    def get_context_data(self, **kwargs):
        context = super(FlatpagesView, self).get_context_data(**kwargs)
        return context

    def dispatch(self, request, *args, **kwargs):
        self.template_name = self.kwargs['template_name']
        return super(FlatpagesView, self).dispatch(request, *args, **kwargs)

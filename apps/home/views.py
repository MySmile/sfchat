from django.views.generic.edit import FormView

from apps.home.forms import JoinChatForm

class HomeView(FormView):
    template_name = 'home.html'
    form_class = JoinChatForm
    success_url = '/join_chat/'

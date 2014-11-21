from mongoengine import ValidationError

from django.http import HttpResponseNotFound
from django.views.generic.edit import FormView
from django.views.generic import View
from django.template import RequestContext, loader, Template, TemplateDoesNotExist

from apps.chat.models import Chats
from apps.chat.utils import ChatPage
from apps.home.forms import JoinChatForm

import logging
logger = logging.getLogger(__name__)


class HomeView(FormView):
    template_name = 'home.html'
    form_class = JoinChatForm

    def form_valid(self, form):
        """
        This method is called when valid form data has been POSTed.
        :param form: Form
        :return: HttpResponse
        """
        # Validation for join to chat
        chat_token = self.request.POST.get('chat_token')
        try:
            user_token = Chats.join_to_chat(chat_token)
            if not user_token:
                return e500(self.request, template_name='500.html')
        except ValidationError as err:
            logger.error(err)
            return e500(self.request, template_name='500.html')

        #self.success_url = '/chat/' + str(chat_token)

        logger.info('User joined to chat: '+chat_token)
        tokens = {'chat_token': chat_token, 'user_token': user_token}
        chat_page = ChatPage(self.request)

        return chat_page.get_redirect_response(tokens)


class CreateView(View):
    def post(self, request, *args, **kwargs):
        tokens = Chats.create_chat()
        logger.info('Chat created: '+tokens['chat_token'])
        chat_page = ChatPage(request)
        return chat_page.get_redirect_response(tokens)


def e500(request, template_name='500.html'):
    try:
        template = loader.get_template(template_name)
    except TemplateDoesNotExist:
        template = Template(
            '<b>Not Found</b>'
            '<p>The requested URL {{ request_path }} was not found on this server.</p>')
    return HttpResponseNotFound(template.render(RequestContext(request, {'request_path': request.path,})))


def e404(request, template_name='404.html'):
    try:
        template = loader.get_template(template_name)
    except TemplateDoesNotExist:
        template = Template(
            '<b>Not Found</b>'
            '<p>The requested URL {{ request_path }} was not found on this server.</p>')
    return HttpResponseNotFound(template.render(RequestContext(request, {'request_path': request.path,})))


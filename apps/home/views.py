from mongoengine import ValidationError

from django.http import HttpResponseNotFound
from django.views.generic.edit import FormView
from django.views.generic import View

from django.template import RequestContext, loader, Template, TemplateDoesNotExist

from apps.chat.models import Chats
from apps.chat.utils import ChatPage
from django.http import HttpResponsePermanentRedirect
from apps.home.forms import JoinChatForm

import logging
logger = logging.getLogger(__name__)


class HomeView(FormView):
    template_name = 'home.html'
    form_class = JoinChatForm

    def form_valid(self, form):
        """
        This method is called when valid form data has been POSTed.
        :param form: JoinChatForm
        :return: HttpResponse
        """
        # join to chat run during validation process
        chat_token = self.request.POST.get('chat_token')
        self.success_url = '/chat/' + str(chat_token)

        chat_page = ChatPage(self.request)
        chat_page.set_user_token(form.user_token)

        logger.info('User joined to chat: '+str(chat_token))
        return super(HomeView, self).form_valid(form)


class CreateView(View):
    def post(self, request, *args, **kwargs):
        tokens = Chats.create_chat()
        chat_page = ChatPage(self.request)
        chat_page.set_user_token(tokens['user_token'])
        success_url = '/chat/' + tokens['chat_token']

        logger.info('Chat created: '+tokens['chat_token'])
        return HttpResponsePermanentRedirect(success_url)


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


def csrf_failure(request, reason=""):
    template_name='403.html'
    try:
        template = loader.get_template(template_name)
    except TemplateDoesNotExist:
        template = Template(
            '<b>HTTP Forbidden</b>'
            '<p>The requested URL {{ request_path }} forbidden.</p>')
    logger.error('error 403: ' + str(request))
    return HttpResponseNotFound(template.render(RequestContext(request, {'request_path': request.path,})))


from django.shortcuts import render_to_response, get_object_or_404
from django.template import RequestContext
from django.http import HttpResponse, HttpResponsePermanentRedirect, HttpResponseNotFound
from django.views.generic.edit import FormView
from django.views.generic import View
from django.template import RequestContext, loader, Template, TemplateDoesNotExist

from bson.objectid import ObjectId
from mongoengine import ValidationError

from apps.chat.models import Messages, Users, Chats
from apps.home.forms import CreateChatForm, JoinChatForm

from apps.api.authentication import TokenAuthentication

import logging
logger = logging.getLogger('log2file')


class HomeView(FormView):
    template_name = 'home.html'
    form_class = JoinChatForm

    def form_valid(self, form):
        # This method is called when valid form data has been POSTed.
        # It should return an HttpResponse
        
        # Validation for join to chat
        chat_token = self.request.POST.get('code')
        try:
            user_token = Chats.join_to_chat(chat_token)
            if not user_token:
                return e500(self.request, template_name='500.html')
        except ValidationError as err:
            logger.error(err)
            return e500(self.request, template_name='500.html')

        self.success_url = '/chat/' + str(chat_token)

        response = HttpResponsePermanentRedirect(self.success_url)
        response[TokenAuthentication.USER_TOKEN_HEADER] = user_token

        return response


class CreateView(View):
    #~ form_class = CreateChatForm
    
    def post(self, request, *args, **kwargs):
        chat_token = Chats.create_chat()
        
        return HttpResponsePermanentRedirect('/chat/' + chat_token)


def e500(request, template_name='500.html'):
    try:
        template = loader.get_template(template_name)
    except TemplateDoesNotExist:
        template = Template(
            '<h1>Not Found</h1>'
            '<p>The requested URL {{ request_path }} was not found on this server.</p>')
    return HttpResponseNotFound(template.render(RequestContext(request, {'request_path': request.path,})))


def e404(request, template_name='404.html'):
    try:
        template = loader.get_template(template_name)
    except TemplateDoesNotExist:
        template = Template(
            '<h1>Not Found</h1>'
            '<p>The requested URL {{ request_path }} was not found on this server.</p>')
    return HttpResponseNotFound(template.render(RequestContext(request, {'request_path': request.path,})))


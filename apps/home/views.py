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
            chat = Chats.objects(id=ObjectId(chat_token))[0]            
            if ((not chat) or (len(chat.user_tokens) != 1)):
                return e500(self.request, template_name='500.html')
            else:
                user_token = ObjectId()
                msg = "Talker was successfully joined to chat" 

                messages = Messages(token=ObjectId(), msg=msg, system=True)
                user = Users(token=user_token, messages = [messages])
                chat.user_tokens.append(user_token)
                chat.users.append(user)
                chat.status = 'ready'
                try:
                    chat.save()
                except ValidationError as err:
                    logger.error(err)
                    return e500(self.request, template_name='500.html')
        except Exception:
            pass
            
        self.success_url = ''.join('/chat/', str(chat_token))
        #~ return super(HomeView, self).form_valid(form)
        return HttpResponsePermanentRedirect(self.get_success_url())

class CreateView(View):
    #~ form_class = CreateChatForm
    
    def post(self, request, *args, **kwargs):
        chat_token = ObjectId()
        user_token = ObjectId()
        msg = ' '.join("Welcome to SFChat! <br /> Please send code:", str(chat_token), "to Talker")
        
        messages = Messages(token=ObjectId(), msg=msg, system=True)
        user = Users(token=user_token, messages = [messages])
        chat = Chats(id=chat_token, users=[user], user_tokens=[user_token])
        chat.save()
        
        return HttpResponsePermanentRedirect('/chat/'+str(chat_token))

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


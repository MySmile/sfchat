from django.shortcuts import render_to_response
from django.template import RequestContext

from apps.chat.models import Chats
from apps.home.views import e404
from apps.chat.utils import ChatPage
from apps.chat.forms import ChatTypeForm


def chat(request, chat_token):
    if Chats.validate_chat_token(chat_token):
        chat_page = ChatPage(request)
        c = {'user_token': chat_page.get_user_token(), 'form': ChatTypeForm()}
        return render_to_response('chat.html', c, context_instance=RequestContext(request))
    else:
        return e404(request, template_name='404.html')

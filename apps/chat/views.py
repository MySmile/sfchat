from django.shortcuts import render_to_response
from django.template import RequestContext

from apps.chat.models import Chats
from apps.home.views import e404
from apps.chat.utils import ChatPage

def chat(request, chat_token):
    if Chats.validate_chat_token(chat_token):
        chat_page = ChatPage(request)
        c = {'user_token': chat_page.get_user_token()}
        return render_to_response('chat.html', c, context_instance=RequestContext(request))
    else:
        return e404(request, template_name='404.html')


def close(request):
    pass

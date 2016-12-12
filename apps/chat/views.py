from django.shortcuts import render_to_response
from django.template import RequestContext
from django.shortcuts import redirect
from django.views.decorators.csrf import csrf_exempt

from apps.chat.models import Chats
from apps.home.utils import e404
from apps.chat.utils import ChatPage
from apps.chat.forms import ChatTypeForm


@csrf_exempt
def chat(request, chat_token):
    if not Chats.validate_chat_token(chat_token):
        return e404(request, template_name='404.html')

    chat = Chats.objects.get_all_by_token(chat_token)
    if chat.status == Chats.STATUS_CLOSED:
        return redirect('/')

    chat_page = ChatPage(request)
    c = {'user_token': chat_page.get_user_token(), 'chat_status': chat.status, 'form': ChatTypeForm(), 'host': request.get_host()}
    return render_to_response('chat.html', c)

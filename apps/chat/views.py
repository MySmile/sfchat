from bson.objectid import ObjectId

#~ from django.views.decorators.csrf import csrf_protect
from django.shortcuts import render_to_response, get_object_or_404
from django.template import RequestContext
from django.http import HttpResponse, HttpResponseRedirect

from apps.chat.models import Chats
from apps.home.views import e404


def chat(request, chat_token):
    if Chats.validate_chat_token(chat_token):
        return render_to_response('chat.html', context_instance=RequestContext(request))
    else:
        return e404(request, template_name='404.html')

def close(request):
    pass

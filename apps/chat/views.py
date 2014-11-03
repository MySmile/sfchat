from bson.objectid import ObjectId

#~ from django.views.decorators.csrf import csrf_protect
from django.shortcuts import render_to_response, get_object_or_404
from django.template import RequestContext
from django.http import HttpResponse, HttpResponseRedirect

from apps.chat.models import Chats


def chat(request, chat_token):
    try:
        if not Chats.objects(id=ObjectId(chat_token)):
            return HttpResponse('raise 401 error here')
    except Exception:
        pass

    c = {'chat_token': chat_token}
     #~ c['msg'] 
    return render_to_response('chat.html', 
                                c, context_instance=RequestContext(request))
        
def close(request):
    pass

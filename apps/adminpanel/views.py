from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.contrib.messages import get_messages
from django.views.generic import View
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.shortcuts import render_to_response
from django.template.context_processors import csrf
from django.http.response import HttpResponseRedirect
from django.core.urlresolvers import reverse

from apps.chat.models import Chats
from apps.adminpanel.management.commands.clearchats import Command

import logging
logger = logging.getLogger(__name__)


class ManagerChatsView(View):

    def get(self, request, *args, **kwargs):
        chats_list = Chats.objects.get_all()
        paginator = Paginator(chats_list, 15) # Show 25 contacts per page

        page = request.GET.get('page')
        try:
            chats = paginator.page(page)
        except PageNotAnInteger:
            # If page is not an integer, deliver first page.
            chats = paginator.page(1)
        except EmptyPage:
            # If page is out of range (e.g. 9999), deliver last page of results.
            chats = paginator.page(paginator.num_pages)
        c = {'chats': chats, 'messages': get_messages(request)}
        c.update(csrf(request))
        return render_to_response('managechats.html', c)

    @method_decorator(login_required(login_url='/admin'))
    def dispatch(self, *args, **kwargs):
        return super(ManagerChatsView, self).dispatch(*args, **kwargs)

class ClearChatsView(View):
    def post(self, request, *args, **kwargs):
        c = Command()
        c.handle()
        messages.add_message(request, c.result['level'], c.result['msg'])
        return HttpResponseRedirect(reverse('chat-manager'))

    @method_decorator(login_required(login_url='/admin'))
    def dispatch(self, *args, **kwargs):
         return super(ClearChatsView, self).dispatch(*args, **kwargs)

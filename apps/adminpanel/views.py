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
        c = {'chats': chats}
        c['messages'] = get_messages(request)
        c.update(csrf(request))
        return render_to_response('managechats.html', c)

    @method_decorator(login_required(login_url='/admin'))
    def dispatch(self, *args, **kwargs):
        return super(ManagerChatsView, self).dispatch(*args, **kwargs)

class ClearChatsView(View):
    CHAT_LIFETIME = 1 #  chat lifetime in days

    def post(self, request, *args, **kwargs):
        try:
            # delete closed chats
            deleted_chats = Chats.delete_closed_chat()
            # auto close chats by time limit
            chats = Chats.objects.get_old_chat(self.CHAT_LIFETIME)
            closed_chats = len(chats)
            for chat in chats:
                chat.pre_delete()
            msg = str(closed_chats) + ' chat(s) closed, ' + str(deleted_chats) + ' chat(s) deleted!'
            logger.info(msg)
            messages.add_message(request, messages.INFO, msg)

        except Exception as err:
            # @TODO Fix. Error: Chats matching query does not exist.
            msg = 'Error: ' + str(err)
            logger.error(msg)
            messages.add_message(request, messages.ERROR, msg)
        return HttpResponseRedirect(reverse('chat-manager'))

    @method_decorator(login_required(login_url='/admin'))
    def dispatch(self, *args, **kwargs):
         return super(ClearChatsView, self).dispatch(*args, **kwargs)

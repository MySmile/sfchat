from time import sleep
from datetime import date, timedelta

from mongoengine import *
from mongoengine.queryset import Q

from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from django.views.generic import View
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.shortcuts import render_to_response

import logging
logger = logging.getLogger(__name__)

from apps.chat.models import Chats, Messages


class ManagerChatsView(View):

    def get(self, request, *args, **kwargs):
        chats_list = Chats.objects.all().values_list('id',  'created', 'status').order_by('-status','-created', )

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
        return render_to_response('managechats.html', {'chats': chats, })

    @method_decorator(login_required(login_url='/admin'))
    def dispatch(self, *args, **kwargs):
        return super(ManagerChatsView, self).dispatch(*args, **kwargs)


class ClearChatsView(View):

    def get(self, request, *args, **kwargs):
        # @TODO: refactore this code in future
        try:
            # prepare to deleting: close chats by time and send messages
            yesterday = date.today() - timedelta(1)
            chats = Chats.objects(created__lte=yesterday)
            for chat in chats:
                chat.close_chat(auto=True)

            sleep(2)

            # delete all messages in closed chats
            chats = Chats.objects(status='closed')

            for chat in chats:
                chat.messages = []
                chat.save()

            # delete closed chats
            msg = str(len(chats)) + ' chat(s) cleaned!'
            chats.delete()
            logger.info(msg)

        except Exception as err:
            msg = 'Error: ' + str(err)
            logger.error(msg)

        return render_to_response('clearchats.html', {'msg': msg, })

    @method_decorator(login_required(login_url='/admin'))
    def dispatch(self, *args, **kwargs):
         return super(ClearChatsView, self).dispatch(*args, **kwargs)


# class ClearChatsView(View):
#
#     def get(self, request, *args, **kwargs):
#         try:
#             yesterday = date.today() - timedelta(1)
#             chats = Chats.objects(Q(status='closed') | Q(created__lte=yesterday))
#             msg = str(len(chats)) + ' chat(s) cleaned!'
#
#             chats.close_chat(auto=True)
#             # chats.delete()
#             logger.info(msg)
#         except Exception as err:
#             logger.error(str(err))
#
#         return render_to_response('clearchats.html', {'msg': msg, })
#
#     @method_decorator(login_required(login_url='/admin'))
#     def dispatch(self, *args, **kwargs):
#         return super(ClearChatsView, self).dispatch(*args, **kwargs)
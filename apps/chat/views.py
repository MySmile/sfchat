#~ from django.shortcuts import render
from django.views.generic.base import View

# Create your views here.

class CreateChatView(View):
    
    def post(self, request):
        return HttpResponse(self.greeting)
        

    #~ @method_decorator(login_required)
    #~ def dispatch(self, *args, **kwargs):
        #~ return super(ProtectedView, self).dispatch(*args, **kwargs)        

class ChatView(View):
    pass

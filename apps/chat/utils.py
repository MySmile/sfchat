from django.http import HttpResponsePermanentRedirect
from django.contrib import messages


class ChatPage:
    def __init__(self, request):
        """
        :param request: HTTPRequest
        :return:
        """
        self.request = request

    def get_redirect_response(self, tokens):
        """
        Gets chat redirect response
        :param tokens: Dictionary {'chat_token': '', 'user_token': ''}
        :return: HttpResponsePermanentRedirect
        """
        self.set_user_token(tokens['user_token'])
        success_url = '/chat/' + tokens['chat_token']
        return HttpResponsePermanentRedirect(success_url)

    def set_user_token(self, user_token):
        """
        Sets user token
        :param user_token: String
        :return:
        """
        messages.success(self.request, user_token)

    def get_user_token(self):
        """
        Gets user token
        :return: String|Boolean user token or false
        """
        storage = messages.get_messages(self.request)
        result = False
        for message in storage:
            message_item = str(message)
            if message.level == messages.SUCCESS and len(message_item) == 24:
                result = message_item
                break

        return result
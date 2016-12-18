from django.contrib import messages


class ChatPage:
    def __init__(self, request):
        """
        :param request: HTTPRequest
        :return:
        """
        self.request = request

    def set_user_token(self, user_token):
        """
        Sets user token
        :param user_token: String
        :return: result: Boolean
        """
        try:
            messages.success(self.request, user_token)
            result = True
        except Exception as ex:
            result = False
        return result

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
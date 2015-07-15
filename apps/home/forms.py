# -*- coding: utf-8 -*-
import re
from django import forms
from apps.chat.models import Chats
from django.utils.translation import ugettext as _


class CreateChatForm(forms.Form):
    pass


class JoinChatForm(forms.Form):
    chat_token = forms.CharField(required=True, max_length=24, label='')
    chat_token.widget = forms.TextInput({"maxlength": 24,
                                         "pattern": "[a-z0-9]{24}",
                                         "autocomplete": "off",
                                         "placeholder": _("please enter your code here..."),
                                         "class": "chat-token"})

    user_token = False

    def clean_chat_token(self):
        """
        Validate chat token
        """
        new_chat_token = self.cleaned_data['chat_token']
        match = re.search(r'[a-z0-9]{24}', new_chat_token)
        if not match:
            raise forms.ValidationError(_('Invalid code.'))

        self.user_token = Chats.join_to_chat(new_chat_token)
        if not self.user_token:
            raise forms.ValidationError(_('Invalid code.'))
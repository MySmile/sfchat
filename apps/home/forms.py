# -*- coding: utf-8 -*-
import re

from django import forms


class CreateChatForm(forms.Form):
    pass

class JoinChatForm(forms.Form):
    chat_token = forms.CharField(required=True, max_length=24, label='')
    chat_token.widget = forms.TextInput({ "placeholder": "Enter code here...",
                                    "onfocus": "this.placeholder = ''",
                                    "onblur": "this.placeholder = 'Enter code here...'",
                                    "maxlength": 24,
                                    "id": "chatToken",
                                })

    def clean_code(self):
        new_chat_token = self.cleaned_data['chat_token']
        match = re.search(r'[^a-z0-9]', new_chat_token)
        if match:
            raise forms.ValidationError('The code must be alphanumeric!')
        elif len(new_chat_token) != 24:
            raise forms.ValidationError('Code length does not equal 24!')
        return new_chat_token

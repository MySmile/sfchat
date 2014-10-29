# -*- coding: utf-8 -*-

from django import forms


class CreateChatForm(forms.Form):
    code = forms.CharField(required=True, max_length=24, label='')
    code.widget = forms.TextInput({ "placeholder": "Enter code here...",
                                    "onfocus": "this.placeholder = ''",
                                    "onblur": "this.placeholder = 'Enter code here...'",
                                })



  

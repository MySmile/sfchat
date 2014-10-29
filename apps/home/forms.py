# -*- coding: utf-8 -*-
import re

from django import forms


class CreateChatForm(forms.Form):
    code = forms.CharField(required=True, max_length=24, label='')
    code.widget = forms.TextInput({ "placeholder": "Enter code here...",
                                    "onfocus": "this.placeholder = ''",
                                    "onblur": "this.placeholder = 'Enter code here...'",
                                })

    def clean_code(self):
        new_code = self.cleaned_data['code']
        match = re.search(r'^[a-z,0-9]', new_value)
        if match:
            raise forms.ValidationError('The code must be alphanumeric!')
        elif len(match) != 24:
            raise forms.ValidationError('Code length does not equal 24!')
        return new_code  

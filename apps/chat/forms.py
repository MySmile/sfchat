import re

from django import forms


class ChatTypeForm(forms.Form):
    chat_type = forms.CharField(label="")
    chat_type.widget = forms.Textarea({"placeholder": "Please type text here...",
                                        "onfocus": "this.placeholder = ''",
                                        "onblur": "this.placeholder = 'Please type text here...'",
                                        "class": "chat-type",
                                        "cols": 0,
                                        "rows": 4,
                                        "maxlength": 144,
                                        "disabled": "True",
                                        })


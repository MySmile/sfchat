from django import forms


class ChatTypeForm(forms.Form):
    chat_type = forms.CharField(label="")
    chat_type.widget = forms.Textarea({"class": "chat-type",
                                       "rows": 4,
                                       "maxlength": 144,
                                       "disabled": "", })

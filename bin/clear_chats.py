import sys, os

import datetime
from datetime import date, timedelta

app_base = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.append(app_base)

from apps.chat.models import Chats


from mongoengine import connect

DEFAULT_CONNECTION_NAME = 'sfchat'
MONGODB_DATABASE_NAME = 'sfchat'
MONGODB_HOST = 'localhost'
MONGODB_PORT = 27017
MONGODB_USERNAME = ''
MONGODB_PASSWORD = ''

connect(MONGODB_DATABASE_NAME,
        host=MONGODB_HOST,
        port=MONGODB_PORT,
        username=MONGODB_USERNAME,
        password=MONGODB_PASSWORD,
        alias='sfchat')

try:
    CHAT_LIFETIME = 1
    # delete closed chats
    msg = Chats.delete_closed_chat() + ' chat(s) deleted!'

    # auto close chats by time limit
    chats = Chats.objects.get_old_chat(CHAT_LIFETIME)
    for chat in chats:
        chat.close_auto_chat()

    with open(app_base+'/log/'+datetime.datetime.now().strftime('%Y-%m-%d')+'_tasks_info.log','a') as f:
        f.write(str(datetime.datetime.now()) + ': ' + msg + '\n')

except Exception as err:
    with open(app_base+'/log/'+datetime.datetime.now().strftime('%Y-%m-%d')+'_tasks_error.log','a') as f:
        f.write(str(datetime.datetime.now()) + ': ' + str(err) + '\n')




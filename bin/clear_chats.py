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
        alias='default')

try:
    yesterday = date.today() - timedelta(1)
    chats = Chats.objects(created__lte=yesterday)
    for chat in chats:
        chat.close_chat(auto=True)

    # delete closed chats
    chats = Chats.objects(status='closed')
    for chat in chats:
        chat.messages = []
        chat.save()

    msg = str(len(chats)) + ' chat(s) cleaned!'
    chats.delete()

    with open(app_base+'/log/'+datetime.datetime.now().strftime('%Y-%m-%d')+'_tasks_info.log','a') as f:
        f.write(str(datetime.datetime.now()) + ': ' + msg + '\n')

except Exception as err:
    with open(app_base+'/log/'+datetime.datetime.now().strftime('%Y-%m-%d')+'_tasks_error.log','a') as f:
        f.write(str(datetime.datetime.now()) + ': ' + str(err) + '\n')




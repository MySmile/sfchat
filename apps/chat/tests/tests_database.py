#~ from django.test import TestCase
#~ from mongoengine import *

#~ from mongoengine.connection import get_db

# Create your tests here.

#~ class InstanceTest(TestCase):

    #~ def setUp(self):
        #~ connect('sfchattest', host='localhost', port=27017, username='', password='')
        #~ self.db = get_db()

    #~ def tearDown(self):
        #~ for collection in self.db.collection_names():
            #~ if 'system.' in collection:
                #~ continue
            #~ self.db.drop_collection(collection)

    #~ def test_default(self):
        #~ class Chat(Document):
            #~ status = StringField(max_length=8)
            #~ status = StringField(max_length=8, required=True, \
                        #~ choices = (('draft', 'draft'), \
                                   #~ ('ready', 'ready'), \
                                   #~ ('closed','closed')), default='draft')
    
        #~ chat = Chat(status='default').save()
        #~ self.assertEqual('draft', chat.status)

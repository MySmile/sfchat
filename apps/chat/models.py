#~ from django.db import models

from mongoengine import *
import datetime


class Messages(EmbeddedDocument):
    token = StringField(max_length=24)
    msg = StringField(max_length=144)
    system = BooleanField(default=False)

class Users(EmbeddedDocument):
    token = StringField(max_length=24)
    users = ListField(EmbeddedDocumentField(Messages))

class Chats(Document):
    status = StringField(max_length=8, \
                        choices = (('draft', 'draft'), \
                                   ('ready', 'ready'), \
                                   ('closed','closed')), default='draft')
    user_tokens = ListField(StringField(max_length=24))
    users = ListField(EmbeddedDocumentField(Users))
    created = DateTimeField(default=datetime.datetime.now)


	#~ users: [
	    #~ {
		  #~ token: ObjectId("507f191e810c19729de860eb"),
		  #~ messages: [
		      #~ {
			  #~ token: ObjectId("507f191e810c19729de860ed"),
			  #~ msg: "Hi, how are you?",
			  #~ system: false
		      #~ }
		  #~ ]











# Create your models here.
#~ 
#~ {
	#~ _id: ObjectId("507f191e810c19729de860ea"),
	#~ status: “ready”,
	#~ user_tokens: [
		#~ ObjectId("507f191e810c19729de860eb"),
		#~ ObjectId("507f1f77bcf86cd799439011")
	#~ ],
	#~ 
	#~ users: [
	    #~ {
		  #~ token: ObjectId("507f191e810c19729de860eb"),
		  #~ messages: [
		      #~ {
			  #~ token: ObjectId("507f191e810c19729de860ed"),
			  #~ msg: "Hi, how are you?",
			  #~ system: false
		      #~ }
		  #~ ]
	    #~ }  
	#~ ],
	#~ 
	#~ created: ISODate("2012-04-03T02:05:06Z")
#~ };



#~ 
#~ structure = {'title': unicode,
                 #~ 'text': unicode,
		 #~ 'metadata': {'tags':[unicode],
                              #~ 'revisions':[int]},
    #~ }
    #~ required_fields = ['title']
    #~ default_values = {'text': u""}
    #~ 
    #~ 
    #~ 
#~ class Metadata(EmbeddedDocument):
    #~ tags = ListField(StringField())
    #~ revisions = ListField(IntField())
#~ 
#~ class WikiPage(Document):
    #~ title = StringField(required=True)
    #~ text = StringField()
    #~ metadata = EmbeddedDocumentField(Metadata)

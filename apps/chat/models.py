#~ from django.db import models

from mongoengine import *
import datetime


class Token(Document):
    token = StringField(max_length=24, required=True)

class Messages(Document):
    token = Token()
    msg = StringField(max_length=144, required=True)




class Chat(Document):
    status = StringField(max_length=8, required=True, \
                        choices = (('draft', 'draft'), \
                                   ('ready', 'ready'), \
                                   ('closed','closed')), default='draft')
    user_tokens = ListField(Token)

    users = ListField(EmbeddedDocumentField(Token))
    
    #~ date_modified = DateTimeField(default=datetime.datetime.now)


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

Create chat
===========

To create chat we should generate "user token" and add them to chat: ::

  var chat_token = ObjectId();
  var user_token = ObjectId();
  var message = {_id: ObjectId(),
                 user_token: user_token, 
                 msg: "Welcome to SFChat <br /> Please send code: " + 
                       chat_token + " to Talker", system: true };
    var chat = {
    _id: chat_token, 
    status: "draft",
    user_tokens: [user_token], 
    created: new Date()
    };
    chat.messages = [message];
    db.chats.insert(chat);

To see that data has been successfully saved please  run such command: ::

  db.chats.find().forEach(printjson);

As a result we have "user token", "invitation code" (chat token) and register system message: ::

  {
    "_id" : ObjectId("543e33a2e3ce324d374246fc"),
    "status" : "draft",
    "user_tokens" : [
        ObjectId("543e33ace3ce324d374246fd")
    ],
    "created" : ISODate("2014-10-15T08:43:44.202Z"),

        "messages" : [{
                "_id" : ObjectId("543e33b4e3ce324d374246fe"),
                “user_token”: ObjectId("543e33ace3ce324d374246fd")
                "msg" : "Welcome to SFChat <br /> 
                         Please send code: 543e33a2e3ce324d374246fc to Talker",
                "system" : true
            }]
  }

To get string value of ObjectId it is need read property "str": ::

  chat_token.str
  
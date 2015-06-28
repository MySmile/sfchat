Join chat by code
=================

To join chat it is need to verify:

* "invitation code"
* number of users in chat

then generate user token and registry system message that chat is ready.

Verification: ::

  db.chats.findOne({
    $and: [
      {_id: ObjectId("543e33a2e3ce324d374246fc")}, 
      {status: "draft"}
    ]}, 
    {_id: 1}
  );
  
If result is null then "invitation code" is invalid otherwise it should be checked number if user_tokens. Such number 
should be 1.

Next generate "user token", update chat status and register system message for "chat creator". To add new message it 
should be used "$push" operator: ::

  var user_token_joiner = ObjectId();
  var message_ready = {
    "_id" : ObjectId(),
    “user_token”:  user_token_joiner,
    "msg" : "Talker was successfully joined to chat", 
    "system" : true
    };

    db.chats.update(
      {_id: ObjectId("543e33a2e3ce324d374246fc")},
      {$set: {status: "ready"}, 
      $push: {user_tokens: user_token_joiner},
      $push: {"messages": message_ready}
    }
  );
  
  
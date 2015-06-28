Authorization
=============

Each request to SFChat api contains "user token", "chat token". If, for instance SFchat api gets: ::

  "chat token" =  543e33a2e3ce324d374246fc,
  "user token" = 543e33ace3ce324d374246fd.

Therefore it is need to run verification: ::

  db.chats.findOne({
    $and: [
      {_id: ObjectId("543e33a2e3ce324d374246fc")}, 
      {status: {$in: [“draft”, “ready”]}},
      {user_tokens: ObjectId("543e33ace3ce324d374246fd")}
      ]}, 
    {_id: 0, messages: 1}
  );

As a result if null that authorization data is invalid otherwise return list of messages.
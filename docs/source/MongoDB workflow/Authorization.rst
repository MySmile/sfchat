Authorization
=============

Each SFChat Api request contains "user token", "chat token". For instance: ::

  "chat token" =  543e33a2e3ce324d374246fc,
  "user token" = 543e33ace3ce324d374246fd.

In this case verification would look like: ::

  db.chats.findOne({
    $and: [
          {_id: ObjectId("543e33a2e3ce324d374246fc")},
          {status: {$in: [“draft”, “ready”]}},
          {user_tokens: ObjectId("543e33ace3ce324d374246fd")}
      ]}, 
    {_id: 0, messages: 1}
  );

As a result null - authorization is invalid otherwise return message list.

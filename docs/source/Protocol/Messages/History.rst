History
-------

Message history is saved inside front-end in Session Storage. Message history is removed during "exit" process.
Refreshing chat page gets all history message from Session Storage *not* from the Server.

To prevent over limiting  Session Storage, in average it's vary from ``4-5M``, the save mechanism was built:

* Limitation over one message: 144 characters
* Handling exception during writing to Session Storage:

  * clear all messages in all chats having history more then ``2880`` items
  * rise exception if there are more then ``40`` active chats

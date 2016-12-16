Exit
^^^^

Exit or close chat has such phases:

* For user who initiates closing conversation is:

  * set chat status to "closed"
  * registry "system message" for chat participants about closing chat
  * stop "long polling" on front-end
  * remove conversation history from ``Session Storage``

* For another user:

  * get "system message" about closing chat
  * clear chat information after "Success delivery confirmation"
  * stop "long polling" on front-end
  * remove conversation history from ``Session Storage``

*Note*: refreshing closed chat page cause redirection to main page.

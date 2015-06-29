Exit
^^^^

Exit or close chat has such phases:

* For user that click to end conversation is:

  * chat marked with "closed" status
  * "system message" for all users is created that chat was closed
  * conversation history removed from Session Storage
  * when user refresh chat page with "close" status then they will be redirected to main page

* For another user:

  * "Long pulling" get "system message"  that chat was closed
  * "Success delivery confirmation" starts to clear Database from chat information
  * FrontEnd "long polling" requests are stopped
  * conversation history is removed from Session Storage
  
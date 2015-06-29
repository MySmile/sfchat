**********
Task queue
**********

Tasks that should run on background with configure scheduler.  Removes all chats, which are status "closed" plus set as 
"closed" all chats with more than 24 hours lifetime.

Chat termination
================

Remove all information about chat if it was created 1 day ago. 
Workflow of chat termination has 2 phases:

#. Remove all chats with status "closed"
#. Set status "closed" and registered for them auto close message if chats are over lifetime limit

So the first run of task removes all undelivered messages. It helps clear chat history in FrontEnd. The second run 
removes information about over lifetime chats.

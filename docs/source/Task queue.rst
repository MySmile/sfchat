**********
Task queue
**********

Tasks that should run on background with configure scheduler.  Removes all chats, which are status "closed" plus set as 
"closed" all chats with more than 24 hours lifetime.

To use the `cron <https://en.wikipedia.org/wiki/Cron>`_ as scheduler do the following: 
run command *crontab -e* and add line::
  
  15 18 * * *     absolute-path/python3 -W ignore absolute-path/manage.py clearchats

The command *clearchats* will be invoked every day in 18:15 
  

.. _Chat_termination:

Chat termination
================

Remove all information about chat if it was created 1 day ago. 
Workflow of chat termination has 2 phases:

#. Remove all chats with status "closed"
#. Set status "closed" and registered for them auto close message if chats are over lifetime limit

So the first run of task removes all undelivered messages. It helps clear chat history in FrontEnd. The second run 
removes information about over lifetime chats.


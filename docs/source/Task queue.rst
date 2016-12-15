**********
Task queue
**********

Task runs on background with configure scheduler. It removes all chats with status "closed" and marks
"closed" all chats with more than 24 hours lifetime.

To configure `cron <https://en.wikipedia.org/wiki/Cron>`_ please:
run command *crontab -e* and add line::
  
  15 18 * * *     absolute-path/python3 -W ignore absolute-path/manage.py clearchats

substituting ``absolute-path`` to python3 interpreter. The command ``clearchats`` will be invoked every day in 18:15.
  

.. _Chat_termination:

Chat termination
================

Chat termination means removing undelivered messages and chat identifiers if it was created more then 1 day ago.
Chat termination has 2 phases workflow:

#. Removing all chats with status "closed"
#. Setting status "closed" and registered for them auto close message if chats are over lifetime limit

The first task run removes all undelivered messages. It helps clear chat history in front-end. The second run
removes information about over lifetime chats.

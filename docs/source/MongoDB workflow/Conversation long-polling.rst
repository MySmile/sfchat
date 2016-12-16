Conversation long-polling
=========================

Conversation is based on long polling. Object "long-polling" is a part of "chat" collection.
Additionally application code should prevent runs several long polling after refreshing chat page.

Table below describes long polling key points:

.. tabularcolumns:: |p{2.5cm}|p{6cm}|p{6cm}|
.. list-table::

    * - **Event**
      - **Front-end**
      - **Back-end**

    * - Start process
      - #. User on a chat page
        #. Ajax request runs to gets messages from server
        #. Ajax request runs to delete messages
        #. Ajax request runs get messages again
      - #. Removes all registered long polling processes for current users
        #. Start new long polling process
        #. Long polling accordingly two configuration parameters: number of iterations and sleeping time (for more information please look into corresponding section)

    * - End process
      - #. Ajax response has 403 code
        #. Chat has "close" status
      - #. Chat was closed
        #. Closing Browser tab was detected [#g1]_


.. rubric:: Footnotes

.. [#g1] Close tab or browser cause close chat only if one of the chat participant has still opened chat. In the case when all chat’s participants have closed chat --- SFChat uses cron task clears garbage data.

Conversation long-polling
=========================

Conversation is based on long polling. Object "long-polling" in the "chat" collection contains attive long polling 
processes. It is essential to prevent runs several long polling after refresh chat page. 

Table below describes key points of long polling:

.. tabularcolumns:: |p{2.5cm}|p{6cm}|p{6cm}|
.. list-table::

    * - Event
      - FrontEnd
      - BackEnd

    * - Start process
      - #. User on a chat page
        #. Ajax request runs to server to gets messages
        #. Then runs Ajax to delete messages
        #. Finally runs get messages again
      - #. Removes all registered long polling processes for current users
        #. Start new long polling process
        #. Long polling accordingly two configuration parameters: number of iterations and sleeping time (for more information please look into corresponding section)

    * - End process
      - #. Ajax response has 403 code
        #. Chat has "close" status
      - #. Chat was closed
        #. Tab of browser close was detected [#g1]_


.. rubric:: Footnotes

.. [#g1] Close tab or browser cause close chat only if one of the chat participant has still opened chat. In the case when all chat’s participants have closed chat --- SFChat uses cron task to clear garbage data.

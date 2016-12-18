Resources
=========

Required header’s for all resources are:

.. list-table::

    * - **Headers**
      - **Type**
      - **Description**

    * - X-SFC-userToken
      - String[24]
      - Unique key for :ref:`authenticate <Authentication>` user in chat

    * - X-SFC-chatToken
      - String[24]
      - Chat Token unique chat identifier

.. toctree::
   :maxdepth: 4
   :titlesonly:

   GET: messages.json <GET-messages-json/index>
   POST: messages.json <POST-messages-json/index>
   DELETE: messages.json <DELETE-messages-json/index>
   DELETE: chat.json <DELETE-chat-json/index>
   Standard response
   Http codes

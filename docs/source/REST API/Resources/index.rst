Resources
=========

Each resources have general required header’s parameters:

.. list-table::

    * - Headers
      - Type
      - Description

    * - X-SFC-userToken
      - String[24]
      - Unique key for :ref:`authenticate <Authentication>` user in chat

    * - X-SFC-chatToken
      - String[24]
      - Chat Token unique chat identifier

For instance for messages resource development environment url looks like:
http://127.0.0.1:8000/api/v1/messages.json

.. toctree::
   :maxdepth: 4
   :titlesonly:

   GET: messages.json <GET-messages-json/index>
   POST: messages.json <POST-messages-json/index>
   DELETE: messages.json <DELETE-messages-json/index>
   DELETE: chat.json <DELETE-chat-json/index>
   Standard response
   Http codes

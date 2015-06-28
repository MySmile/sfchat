********************
Django configuration
********************

Configuration is in base.py file: ::

  SFCHAT_API = {
    'authentication': {
    'user_token_header': 'HTTP_X_SFC_USERTOKEN',
    'chat_token_header': 'HTTP_X_SFC_CHATTOKEN'
    },
    'long_polling': {
    'sleep': 3,
    'iteration': 60
    },
  }

Configuration description:

.. tabularcolumns:: |p{6.5cm}|p{3cm}|p{6cm}|
.. list-table::
  
    * - Key
      - Type
      - Description

    * - authentication.user_token_header
      - Sting[32]
      - Header name for "user token"

    * - authentication.chat_token_header
      - String[32]
      - Header name for "chat token"

    * - long_polling.sleep [#f1]_
      - Integer, sec
      - Number of second that indicates how long long polling iteration should sleep before start new one

    * - long_polling.iteration
      - Integer
      - Number of long polling iterations for one process

.. rubric:: Footnotes

.. [#f1] Multiplies long_polling.sleep with long_polling.iteration show how long long polling process runs. Time that necessary to figure close tab and browser is calculated as: *2 * long_polling.sleep * long_polling.iteration*
 
 
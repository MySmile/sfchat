********************
Django configuration
********************

Configuration is in `base.py <https://github.com/MySmile/sfchat/blob/master/sfchat/settings/base.py>`_ file: ::

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
  
    * - **Key**
      - **Type**
      - **Description**

    * - authentication.user_token_header
      - Sting[32]
      - Header name for "user token"

    * - authentication.chat_token_header
      - String[32]
      - Header name for "chat token"

    * - long_polling.sleep [#f1]_
      - Integer, sec
      - Number of second that indicates how long long polling iteration is sleep before start new one

    * - long_polling.iteration
      - Integer
      - Number of long polling iterations for one process

.. rubric:: Footnotes

.. [#f1] Multiplies long_polling.sleep with long_polling.iteration show how progress time for one "long pulling" runs. Time to figure out that user close browser's chat tab is: *2 * long_polling.sleep * long_polling.iteration*.

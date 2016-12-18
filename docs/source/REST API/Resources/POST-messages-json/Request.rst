Request
=======

Request does not have any special parameters. Table below describes response body structure:

.. list-table::
    :widths: 20 35 45

    * - **Parameter**
      - **Type**
      - **Description**

    * - data
      - Object
      - root object
 
    * - data.messages
      - Array
      - root element for messages

    * - data.messages.msg
      - String[140]
      - message body

*Note*: in case if messages was not sent front-end client keeps sending message until reaching max attempt limit.

Body example is: ::

  {
    ‘data’: {
            messages : [
                0: {
                    ‘msg’: ‘Message body’
                }
            ]
        }
  }

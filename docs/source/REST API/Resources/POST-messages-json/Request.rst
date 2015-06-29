Request
=======

Request does not have any special parameters. But body contains data with in structure that describes below.

.. list-table::
    :widths: 20 35 45

    * - Parameter
      - Type
      - Description

    * - data
      - Object
      - root object
 
    * - data.messages
      - Array
      - root element for messages

    * - data.messages.msg
      - String[140]
      - message body

Note: It’s possible that for some reason data were not sent so to prevent missing message the FrontEnd client keeps 
sending message until max attempt limit will be reach.

Example of body is: ::

  {
    ‘data’: {
            messages : [
                0: {
            ‘msg’: ‘Message body’
            }]
        }
  }

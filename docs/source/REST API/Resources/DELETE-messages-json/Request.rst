Request
=======

Request does not have any special parameters.

.. list-table::

    * - Parameters
      - Type
      - Description

    * - data
      - Object
      - root object

    * - data.messages
      - Array
      - root element for messages

    * - data.messages._id
      - String[24]
      - message identifier

Example of body is: ::

    {‘data’:  {
            messages : [
                0: { ‘_id’: ’0cbc6611f5540bd0809a388dc95a615b’}
                ]
       }
    }
    
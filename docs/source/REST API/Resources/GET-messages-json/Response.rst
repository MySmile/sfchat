Response
========

Table below describes parameters in response body:

.. list-table::

    * - Parameters
      - Type
      - Description

    * - results
      - Object
      - root object for response

    * - results.code
      - Integer
      - response code

    * - results.msg
      - String
      - response message

    * - results.count
      - Integer
      - number of messages

    * - results.status
      - Boolean
      - :ref:`chat status <ChatStatuses>`

    * - results.messages
      - Array
      - container of messages

    * - results.messages._id
      - String[24]
      - message identifier

    * - results.messages.msg
      - String[140]
      - message body

    * - results.messages.system
      - Boolean
      - true if message is system or false otherwise 

Response code is: 200 if Okey or other errors code otherwise.

For instance response with two messages would look like: ::

  {
    ‘results’: {
        ‘code’: 200,
        ‘msg’: ‘Ok’,
        ‘count’: 2,
        ‘status’: ‘ready’
        ‘messages’: [
    0: {
        ‘_id’:’0cbc6611f5540bd0809a388dc95a615b’,
        ‘msg’: ‘Hi, how are you?’,
        ‘system’: false
    },
    1: {
        ‘token’:’0cbc6611f5540bd0809a388dc95a615a,
        ‘msg’: ‘Where are you?’,
        ‘system’: false
        }]
      }
  }

Empty response has that structure: ::

  {
        ‘results’: {
            ‘code’: 200,
            ‘msg’: ‘Ok’,
            ‘count’: 0,
            ‘status’: ‘ready’
        ‘messages’: []
        }
  }

Standard response
=================

.. list-table::

    * - Parameters
      - Type
      - Description
    
    * - results
      - Object
      - root object

    * - results.code
      - Integer
      - response code

    * - results.msg
      - String
      - response message

Response code is: 202 if Okey or other errors code otherwise.

Example: ::
    {
        ‘results’: {
            ‘code’: 200,
            ‘msg’: ‘Ok’
        }
    }

Note: for "error" code like 500, 404, etc. message should be displayed as a "system message". For full list of used http 
codes please follow the corresponding section.


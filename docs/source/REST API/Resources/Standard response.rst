.. _StandardResponse:

Standard response
=================

.. tabularcolumns:: |p{4cm}|p{5cm}|p{5cm}|
.. list-table::
    
    * - **Parameters**
      - **Type**
      - **Description**
    
    * - results
      - Object
      - root object

    * - results.code [#f1]_ 
      - Integer
      - response code

    * - results.msg
      - String
      - response message

Response code is 202 if Ok or error code otherwise.

Example: ::

  {
    ‘results’: {
        ‘code’: 200,
        ‘msg’: ‘Ok’
     }
  }


.. rubric:: Footnotes
  
.. [#f1] For "error" code like 500, 404, etc. message is displayed as a "system message".

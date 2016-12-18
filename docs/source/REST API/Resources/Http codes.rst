Http codes [#f1]_
=================

.. tabularcolumns:: |p{2cm}|p{3cm}|p{5cm}|p{5cm}|
.. list-table::
    
    * - **Code**
      - **Message**
      - **Standard description**
      - **SFChat description**

    * - 200
      - Ok
      - The request has succeeded
      - For all successful request GET

    * - 202
      - Accepted
      - Request has been accepted for processing, but process has not been completed
      - Sending new message to FChat server. But it is not guarantee that message will be delivery to addressee.

    * - 401
      - Unauthorized
      - Request requires user authentication
      - User token is invalid

    * - 404
      - Not Found
      - Server has not found anything matching the Request-URI
      - Undefined resource

    * - 501
      - Not Implemented
      - Server does not support the functionality required to fulfill the request
      - Method for such resource is not allowed

    * - 500
      - Internal Server Error
      - Server encountered an unexpected condition which prevented it from fulfilling the request
      - Unexpected situation was happen. That makes error, exception, etc. 
  

.. rubric:: Footnotes

.. [#f1] Rest API Framework is used all set of http errors handlers so table above is not a full code list.

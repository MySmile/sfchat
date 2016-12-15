Authorization
=============

Authorization process has different for "chat creator" and "chat joiner".

"Chat creator":

#. creates chat
#. generates "Invitation code" and saves it in database
#. generates "user token" and saves it in database

"Chat joiner":

#. verify "Invitation code"
#. set chat status as "ready"
#. generate "user token" and save it in database

More details in :ref:`diagrams <Diagrams>`.

Authorization
=============

Authorization process has vary from "chat creator" and "chat joiner". 

"Chat creator":

#. creates chat,
#. generates "Invitation code" and saves it in database,
#. generates "user token" and saves it in database.

"Chat joiner":

#. verify "Invitation code"
#. set chat status as "ready"
#. generate "user token" and save it in database.

For details please follow :ref:`diagrams <Diagrams>`.
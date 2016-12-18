.. _ChatStatuses:

Chat Statuses
=============

Chat status helps to indicate how to proceed chat. Workflow is different for each status.

.. list-table::
    :widths: 10 90

    * - **Name**
      - **Description**

    * - draft
      - New chat was created, “invitation code” was generated. Chat is “wait” for joining another participant.
      
    * - ready
      - Chat is ready. “Invitation code” was accepted.
      
    * - closed
      - Chat was closed with one of participant. It helps to block sending new messages and removes all history from database.

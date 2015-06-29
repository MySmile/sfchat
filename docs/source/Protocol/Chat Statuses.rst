.. _ChatStatuses:

Chat Statuses
=============

Status shows in what state particular entity now. Workflow is different accordingly status. So please follow 
corresponding workflow section for more details.

.. list-table::
    :widths: 10 90

    * - Name
      - Description

    * - draft
      - New chat was created, “invitation code” was generated. Chat is “wait” for join another participant.
      
    * - ready
      - So chat is ready for secure use. “Invitation code” was accepted.
      
    * - closed
      - Chat was closed with one of participant. It helps to block sending new messages  and remove all history from database.
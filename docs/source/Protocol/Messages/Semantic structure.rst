Semantic structure
------------------

Semantic structure for "user message" is: ::

  <div id="msg-%message token%" class="message">
    <div class="msg-date">13:22:51</div>
    <div class="msg-name">You</div>
    <div class="msg-text">Hi, how are you doing today?</div>
  </div>

Semantic structure of "system message" is: ::

  <div id="msg-%message token%" class="message system">
    <div class="border"></div>
      <div class="msg-text">Internal error has occured. 
         Your message will be resend automatically again, 
         please contact to help desk if such error appears again.
      </div>
    <div class="border"></div>
  </div>

Where ``%message token%`` is placeholder for "message token". [#f1]_


.. rubric:: Footnotes

.. [#f1] "Message token" is reserved for future usage to indicate that message is on a delivery way. It’s just idea.


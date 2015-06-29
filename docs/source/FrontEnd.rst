********
FrontEnd
********

All frontEnd components should be:

#. supported cross-browsers last two version of each populars ones (Chrome, FF, Opera, Safary, IE)
#. supported different desktop and mobile OS 
#. minified
#. gziped
#. applied Content Security Policy


CSS, HTML
=========

All CSS should follow Google recommendation.

JScript
=======

JScript should follow as much as possible manifesto.

Each new JS class should be property of SFChat object. That object is a "namespace". So /js/sfChat.js: ::

  var sfChat = {};

Others modules in that case for instance /js/sfChat/validator.js: ::

  sfChat.validator = {
    ...
  };




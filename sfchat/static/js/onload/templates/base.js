/**
 * onload/templates/base.js: Onload event runs in base template
 */

"use strict";

$(document).ready(function() {    
    // check namespace
    if (!window.SFChat || !window.SFChat.events) {
        throw new Error('One of required modules was not loaded.');
    }
    
    var gaOptions = window.SFChat.getOnloadOptions('.onload-js-options', 
        ['googleAnalytics.debugMode', 'googleAnalytics.trackingId']);
    
    // error handler configuration
    window.onerror = window.SFChat.events.gatracking;
    
    // ga configuration
    window.SFChat.events.gatracking.debugmode  = gaOptions['googleAnalytics']['debugMode'];
    ga('create', gaOptions['googleAnalytics']['trackingId'], 'auto');
    ga('send', 'pageview', {
      'anonymizeIp': true
    });
});

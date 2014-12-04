/**
 * onload/templates/base.js: Onload event runs in base template
 */

"use strict";

$(document).ready(function() {    
    // check namespace
    if (!SFChat || !SFChat.errorHandler || !SFChat.events) {
        throw new Error('One of required modules was not loaded.');
    }
    
    var gaOptions = SFChat.getOnloadOptions('.onload-js-options', [
        'googleAnalytics.debugMode', 
        'googleAnalytics.trackingId',
        'errorHandler.targetError',
        'errorHandler.hideClass'
    ]);
    
    // debug mode
    SFChat.debugmode = gaOptions['googleAnalytics']['debugMode'];
    
    // error handler configuration
    SFChat.errorHandler.init(gaOptions['errorHandler']);
    window.onerror = SFChat.errorHandler.onError;
    
    // ga configuration
    ga('create', gaOptions['googleAnalytics']['trackingId'], 'auto');
    ga('send', 'pageview', {
      'anonymizeIp': true
    });
});

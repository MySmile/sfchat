/**
 * onload/home/home.js: Onload event runs in home.home.html template
 */

"use strict";

$(document).ready(function() {    
    // check namespace
    if (!window.SFChat || !window.SFChat.bootstrap) {
        throw new Error('One of required modules was not loaded.');
    }
    
    var chatOptions = window.SFChat.getOnloadOptions('.onload-js-options', [
        'chatBootstrap.endPoint',
        'chatBootstrap.userToken',
        'chatBootstrap.chatStatus'
    ]);
    
    new window.SFChat.bootstrap(chatOptions['chatBootstrap']);
});

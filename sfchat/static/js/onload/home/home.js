/**
 * onload/home/home.js: Onload event runs in home.home.html template
 */

"use strict";

$(document).ready(function() {    
    // check namespace
    if (!window.SFChat || !window.SFChat.events) {
        throw new Error('One of required modules was not loaded.');
    }
    
    var homeOptions = window.SFChat.getOnloadOptions('.onload-js-options', 
        ['buttonTarget.createChat', 'buttonTarget.joinChat']);
    
    window.SFChat.events.gatracking.btnClickHandler(
        homeOptions['buttonTarget']['createChat'], 'create new chat'
    );
    window.SFChat.events.gatracking.btnClickHandler(
        homeOptions['buttonTarget']['joinChat'], 'join to chat'
    );
});

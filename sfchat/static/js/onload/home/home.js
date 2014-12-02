/**
 * onload/home/home.js: Onload event runs in home.home.html template
 */

"use strict";

$(document).ready(function() {    
    // check namespace
    if (!SFChat || !SFChat.events) {
        throw new Error('One of required modules was not loaded.');
    }
    
    var homeOptions = SFChat.getOnloadOptions('.onload-js-options', 
        ['buttonTarget.createChat', 'buttonTarget.joinChat']);
    
    SFChat.events.gatracking.btnClickHandler(
        homeOptions['buttonTarget']['createChat'], 'create new chat'
    );
    SFChat.events.gatracking.btnClickHandler(
        homeOptions['buttonTarget']['joinChat'], 'join to chat'
    );
});

/**
 * sfchat/api/v1/renders/systemMessages.js: SFChat Api Message Render
 */

"use strict";

// check namespace
var SFChat;
if (!SFChat.api) {
    throw new Error('One of required modules was not loaded.');
} else if (!SFChat.api.renders) {
    SFChat.api.renders = {};
}
    
if (SFChat.api.renders.systemMessages) {
    throw new Error('Module with name SFChat.api.renders.systemMessages has already exist.');
}

/**
 * SFChat API System Message Render
 * 
 * @type {Function}
 * @return {Object}
 */
SFChat.api.renders.systemMessages = (function() {
    var msgTextClass = 'msg-text';
    
    /**
     * Gets System Message template
     * 
     * @return {jQuery}
     */
    var getMessageTmp = function() {    
        var result = $('<div>', {'class': 'message system'})
            .append($('<div>', {'class': 'msg-border'}));
    
        result.append($('<div>', {'class': msgTextClass}));     
        result.append($('<div>', {'class': 'msg-border'})); 
        
        return result;
    };
     
    /**
     * Render Message
     * 
     * @param {String} msg
     * @return {jQuery}
     */
    var renderMessage = function(msg) {
        var messageTmp = getMessageTmp();
        $( '.' + msgTextClass, messageTmp).html(msg);   
        
        return messageTmp;
    };
    
    return {
        render: renderMessage
    };    
})();

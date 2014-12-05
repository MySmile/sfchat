/**
 * sfchat/api/v1/renders/messages.js: SFChat Api Message Render
 */

"use strict";

// check namespace
var SFChat;
if (!SFChat.api) {
    throw new Error('One of required modules was not loaded.');
} else if (!SFChat.api.renders) {
    SFChat.api.renders = {};
}
    
if (SFChat.api.renders.messages) {
    throw new Error('Module with name SFChat.api.renders.messages has already exist.');
}

/**
 * SFChat API Message Render
 * 
 * @type {Function}
 * @return {Object}
 */
SFChat.api.renders.messages = (function() {
    var prevMsgSource,
        msgTextClass    = 'msg-text',
        msgNameClass    = 'msg-name',
        msgDateClass    = 'msg-date',
        msgSourceOpt    = {
            you:    {'class': 'msg-you', text: 'You:', default: '...'},
            talker: {'class': 'msg-talker', text: 'Talker:', default: '...'}
        };
    
    /**
     * Gets Message template
     * 
     * @return {jQuery}
     */
    var getMessageTmp = function() {
        var result = $('<div>', {'class': 'message'})
            .append($('<div>', {'class': msgDateClass}));
        
        result.append($('<div>', {'class': msgNameClass}));
        result.append($('<div>', {'class': msgTextClass}));
        
        return result;
    };
    
    /**
     * Render Message Name
     * 
     * @param {jQuery} messageTmp
     * @param {String} msgSource
     */
    var renderMessageName = function(messageTmp, msgSource) {
        var messageNameText, 
            messageName = $('.' + msgNameClass, messageTmp);
        
        msgSource = (typeof(msgSource) === 'undefined')? 'you': msgSource;    
        if(typeof(msgSourceOpt[msgSource]) === 'undefined') {
            throw new Error('Message source is not valid.');
        }
        
        // remove class
        $.each(msgSourceOpt, function(key, item){
            messageName.removeClass(item['class']); 
        });
        
        // add proper class
        messageName.addClass(msgSourceOpt[msgSource]['class']);
        
        // add message name
        messageNameText = (msgSource === prevMsgSource)? 
            msgSourceOpt[msgSource]['default']: msgSourceOpt[msgSource]['text'];
        
        messageName.html(messageNameText);
        
        // save prev stage
        prevMsgSource = msgSource;
    };
    
    /**
     * Pad zero to the date string like "01"
     * 
     * @param {Integer} data
     * @return {String}
     */
    var padZero = function(data) {
        return data > 10 ? data : '0' + data;
    };
    
    /**
     * Render Messsage Date
     * 
     * @param {jQuery} messageTmp
     * @param {String} date
     */
    var renderMessageDate = function(messageTmp, date) {
        var date = (typeof(date) === 'undefined')? new Date(): new Date(date),
            dateComponents = [date.getHours(), date.getMinutes(),date.getSeconds()],
            dateRendered;
            
        // add zeros
        dateComponents  = dateComponents.map(padZero);
        dateRendered    = '[' + dateComponents.join(':') + ']';
        
        $('.' + msgDateClass, messageTmp).html(dateRendered);
    };
        
    /**
     * Render Message
     * 
     * @param {String} msg
     * @param {String} date
     * @param {String} msgSource
     * @return {jQuery}
     */
    var renderMessage = function(msg, date, msgSource) {
        var messageTmp = getMessageTmp();
        
        msg = sanitizeMessage(msg);    
        $('.' + msgTextClass, messageTmp).html(msg);
        renderMessageName(messageTmp, msgSource);
        renderMessageDate(messageTmp, date);
        
        return messageTmp;
    };
    
    /**
     * Sanitize Message
     * 
     * @param {String} msg
     * @return {String}
     */
    var sanitizeMessage = function(msg) {
        var sanitize = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;'
        };
        
        msg = msg.replace(/[&<>]/g, function(item) {
            return sanitize[item] || item;
        });
        msg = msg.replace(/\n/gi, "<br>");
        
        return msg;
    };
 
    return {
        render: renderMessage
    };    
})();

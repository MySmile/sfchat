/**
 * sfchat/ga.js: SFChat Google Analytics
 */

"use strict";

// check namespace
var SFChat;
if (!SFChat) {
    throw new Error('One of required modules was not loaded.');
}
    
if (SFChat.ga) {
    throw new Error('Module with name SFChat.ga has already exist.');
}

/**
 * SFChat Google analytics
 * 
 * @type {Function}
 */
SFChat.ga = {
    /**
     * Debug mode
     * 
     * @property {Boolean}
     */
    debugmode: false,
    
    /**
     * Previous error
     * 
     * @type {String}
     */
    _prevError: undefined,
    
    /**
     * Error hadler
     * 
     * @param {String}  msg
     * @param {String}  url
     * @param {Integer} line
     * @TODO sent to GA if debugmode === false
     */
    errorHandler: function(msg, url, line) {
        var _this = SFChat.ga,
            error;
        
        if (_this.debugmode === true) {
            // run default handler
            return false;
        }
        
        error = JSON.stringify({
            msg: msg,
            url: url,
            line: line
        });
        if(_this.debugmode === false && _this._prevError !== error) {
            _this._prevError = error;
            ga('send', 'event', 'error', error);         
        }
        
        return true;
    },
    
    /**
     * Utility to wrap the different behaviors between W3C-compliant browsers
     * and IE when adding event handlers.
     *
     * @param {Object} element Object on which to attach the event listener.
     * @param {string} type A string representing the event type to listen for
     *     (e.g. load, click, etc.).
     * @param {function()} callback The function that receives the notification.
     */
    addListener: function(element, type, callback) {
        if (element.addEventListener) element.addEventListener(type, callback);
        else if (element.attachEvent) element.attachEvent('on' + type, callback);
    }
};

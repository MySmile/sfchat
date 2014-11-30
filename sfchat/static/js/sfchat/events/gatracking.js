/**
 * sfchat/events/gatracking.js: SFChat Google Analytics
 */

"use strict";

// check namespace
var SFChat;
if (!SFChat) {
    throw new Error('One of required modules was not loaded.');
} 

if (!SFChat.events) {
    SFChat.events = {};
}

if (SFChat.events.gatracking) {
    throw new Error('Module with name SFChat.events.gatracking has already exist.');
}

/**
 * SFChat Google analytics
 * 
 * @type {Object}
 */
SFChat.events.gatracking = {
    /**
     * Debug mode
     * 
     * @property {String} False or True
     */
    debugmode: 'False',
    
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
     */
    errorHandler: function(msg, url, line) {
        var _this = SFChat.events.gatracking,
            error;
        
        if (_this.debugmode === 'True') {
            // run default handler
            return false;
        }
        
        error = JSON.stringify({msg: msg, url: url, line: line});
        if(_this.debugmode === false && typeof(ga) !== 'undefined'
            && _this._prevError !== error
        ) {
            _this._prevError = error;
            ga('send', 'event', 'error', error);         
        }
        
        return true;
    },
    
    /**
     * Handle button click event
     * 
     * @param {type} target
     * @param {type} label
     * @returns {undefined}
     */
    btnClickHandler: function(target, label) {
        var _this = SFChat.events.gatracking;
        
        _this.addListener($(target).get(0), 'click', function() {
            ga('send', 'event', 'button', 'click', label);
        });
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
        var _this = SFChat.events.gatracking;
        
        // skip for debug mode
        if (_this.debugmode === 'True') {
            return;
        }
        
        if (element.addEventListener) { 
            element.addEventListener(type, callback);
        } else if (element.attachEvent) { 
            element.attachEvent('on' + type, callback);
        }
    }
};
